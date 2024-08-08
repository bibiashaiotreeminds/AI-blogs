const dotenv = require("dotenv");
dotenv.config();
const AWS = require('aws-sdk');
const OpenAI = require("openai");
const asyncHandler = require("express-async-handler");
const { pool } = require("../config/db");
const cron = require("node-cron");
const axios = require("axios");

AWS.config.update({
  accessKeyId: 'AKIA2I64SQYYEZUEREW4',
  secretAccessKey:'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',
  region: 'ap-south-1', 
});


const s3 = new AWS.S3();

const uploadImageToS3 = async (imageData, imageName) => {
  const params = {
    Bucket: 'im-stage-bucket', 
    Key: imageName, 
    Body: imageData, 
  };

  try {
    const data = await s3.upload(params).promise();
    console.log('Image uploaded successfully:', data.Location);
    return data.Location; 
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

const createBlog = asyncHandler(async (req, res) => {
  const image = !!req.file;
  const { title, description, slug, date, time } = req.body;
  if (!title || !slug || !image || !description || !date || !time) {
    res.status(400);
    throw new Error("Please include all fields");
  }
  const sanitizedSlug = req.body.slug.replace(/[^a-zA-Z\s]/g, ""); 
  const slugWithUnderscores = sanitizedSlug.replace(/\s+/g, "_");

  const slugExists = await pool.query('SELECT * FROM "blogSchedule" WHERE slug=$1', [
    slug,
  ]);
  if (slugExists.rows.length > 0) {
    res.status(400);
    throw new Error("Already exist");
  }

  const filename = Date.now()+"."+ req.file.mimetype.split("/")[1]
   const s3ImageUploadedURL = await uploadImageToS3(req.file.buffer, filename);

  const result = await pool.query(
    'INSERT INTO "blogSchedule" (title, slug, image, description, date, time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [title, slug, s3ImageUploadedURL, description, date, time]
  );

  if (result) {
    res.status(201).json(result.rows[0]);
  } else {
    res.status(400);
    throw new Error("Invalid blog data");
  }
  res.send("Register Route");
});


const openai = new OpenAI({
  apiKey: "sk-proj-1RPblKQn20z9ELeFhvBmT3BlbkFJosd368zcqXiqrFXKjHBv",
});

const generateContent = async (imagePrompt) => {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: imagePrompt,
      n: 1,
      size: "1024x1024",
    });
    const imageUrl = response.data[0].url;
    return imageUrl;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};

const chat = async (prompt) => {
  const resp = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 100,
  });
  return resp.choices[0].message.content;
};

const createBlogSchedule = asyncHandler(async (req, res) => {
  const { title, description, date, time, slug, contentPrompt, imagePrompt } =
    req.body;
    console.log("Received imagePrompt:", req.body);

  if (
    !title ||
    !description ||
    !imagePrompt ||
    !contentPrompt  ||
    !slug ||
    !date ||
    !time 
  
    
  ) {
    res.status(400).json({ error: "Please include all required fields." });
    return;
  }

  const sanitizedSlug = req.body.slug.replace(/[^a-zA-Z\s]/g, "");
  const slugWithUnderscores = sanitizedSlug.replace(/\s+/g, "_");

  const slugExists = await pool.query('SELECT * FROM "blogs" WHERE slug=$1', [
    slug,
  ]);
  if (slugExists.rows.length > 0) {
    res.status(400);
    throw new Error("Already exist");
  }

  const scheduledDateTime = new Date(`${date} ${time}`);
  const currentDateTime = new Date();

  function convertDateTimeToCronExpression(dateTimeString) {
    const [datePart, timePart] = dateTimeString.split(" ");
    const [year, month, day] = datePart.split("-");
    const [hour, minute] = timePart.split(":");
    const cronExpression = `${minute} ${hour} ${day} ${month} *`;
    return cronExpression;
  }

  const dateTimeString = `${date} ${time}`;
  const formattedDateTimeString = dateTimeString.replace(/\//g, "-");
  const cronExpression = convertDateTimeToCronExpression(
    formattedDateTimeString
  );

  if (scheduledDateTime <= currentDateTime) {
    res
      .status(400)
      .json({ error: "Scheduled date and time must be in the future." });
    return;
  }

  const image = await generateContent(imagePrompt);
  const s3ImageUploadedURL = await uploadImageToS3(image, "image.jpg");

  // cron.schedule(cronExpression, async () => {
  //   try {
      const content = await chat(contentPrompt);

      const result = await pool.query(
        'INSERT INTO "blogSchedule" (title, description, slug, content, date, time, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [title, description, slug, content, date, time, s3ImageUploadedURL]
      );

      // res.setHeader('Content-Type', 'text/html'); // Set Content-Type header
      res.status(201).json({
        message: "Blog scheduled successfully.",
        blog: result.rows[0],
      });
  //   } catch (error) {
  //     console.error("Error scheduling blog:", error);
  //     res.status(500).json({ error: "Internal server error." });
  //   }
  // });

  // res.setHeader('Content-Type', 'text/html'); // Set Content-Type header
  // res.status(200).json({ message: "Blog scheduled for creation." });
});


const editBlogSchedule = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // const blogId = BigInt(id);

  // if (isNaN(blogId)) {
  //   res.status(400);
  //   throw new Error("Id is missing or invalid");
  // }

  const searchId = await pool.query('SELECT * FROM "blogs" WHERE id = $1', [
    id,
  ]);

  if (!searchId.rows.length > 0) {
    res.status(400);
    throw new Error("Blog does not exist");
  }

  const { title, description, image, slug, content } = req.body;

  const result = await pool.query(
    'UPDATE "blogSchedule" SET title = $1, description = $2, image = $3, slug = $4, content = $5 WHERE id = $6 RETURNING *',
    [title, description, image, slug, content, id]
  );

  if (result.rows.length > 0) {
    res.status(200).json(result.rows[0]);
  } else {
    res.status(400);
    throw new Error("Invalid blog data");
  }
});

// Delete Blog Schedule
const deleteBlogSchedule = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    throw new Error("Id is missing");
  }

  const result = await pool.query(
    'DELETE FROM "blogSchedule" WHERE id=$1 RETURNING *',
    [id]
  );

  if (result.rows.length > 0) {
    res.status(200).json({ message: "Blog schedule deleted successfully" });
  } else {
    res.status(400);
    throw new Error("Failed to delete blog schedule");
  }
});

const getGlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    throw new Error("Id is missing");
  }

  const searchId = await pool.query('SELECT * FROM "blogs" WHERE id=$1', [id]);
  if (!searchId.rows.length > 0) {
    res.status(400);
    throw new Error("Blog does not exist");
  }

  // const result = await pool.query('SELECT * FROM "blogs"');
  res.json(searchId.rows);
});

const getGlogs = asyncHandler(async (req, res) => {
  const result = await pool.query('SELECT * FROM "blogs"');
  console.log(result.rows)
  res.json(result.rows);
});

const getScheduleBlog = asyncHandler(async (req, res) => {
  const result = await pool.query('SELECT * FROM "blogSchedule"');
  console.log(result);
  res.json(result.rows);
});


module.exports = {
    getGlogById,
  editBlogSchedule,
  deleteBlogSchedule,
  getScheduleBlog,
  createBlogSchedule,
  getGlogs,
  createBlog,
};
