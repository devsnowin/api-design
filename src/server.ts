const express = require('express');
import express from 'express';

const app = express();

app.get('/', (req, res) => {
	res.status(200);
	res.json({
		success: true,
		msg: 'Hello !',
	});
});

export default app;
