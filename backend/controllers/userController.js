const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");

const dotenv = require("dotenv");
const db = require("../config/database");

dotenv.config();


exports.getUsers = catchAsyncErrors(async (req, res, next) => {
  const { user_type } = req.query;
  console.log(user_type);
  let query = "SELECT * FROM users";
  let values = [];

  if (user_type) {
    query += " WHERE user_type = ?";
    values.push(user_type);
  }
 
  db.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(200).json({success: true, users:results});
  });
});
 // Your async error handler
 
exports.getAllAttendances = catchAsyncErrors(async (req, res, next) => {
  const query = 'SELECT * FROM attendance';

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json(results);
  });
});
// Mark attendance
// Your async error handler

// Mark Attendance
exports.markAttendance = catchAsyncErrors(async (req, res, next) => {
  const { user_id, date, status, reason } = req.body;
  
  if (!user_id || !date || !status) {
    return res.status(400).json({ message: 'User ID, date, and status are required' });
  }

  // Check if attendance record already exists
  const checkQuery = 'SELECT * FROM attendance WHERE user_id = ? AND date = ?';
  const checkValues = [user_id, date];

  db.query(checkQuery, checkValues, (checkErr, checkResults) => {
    if (checkErr) {
      console.error(checkErr);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (checkResults.length > 0) {
      // Record exists, remove it
      const deleteQuery = 'DELETE FROM attendance WHERE user_id = ? AND date = ?';
      db.query(deleteQuery, checkValues, (deleteErr, deleteResults) => {
        if (deleteErr) {
          console.error(deleteErr);
          return res.status(500).json({ message: 'Internal server error' });
        }
        return res.status(200).json({ message: 'Attendance record removed successfully' });
      });
    } else {
      // Record does not exist, insert it
      const insertQuery = 'INSERT INTO attendance (user_id, date, status, reason) VALUES (?, ?, ?, ?)';
      const insertValues = [user_id, date, status, reason || null];
      
      db.query(insertQuery, insertValues, (insertErr, insertResults) => {
        if (insertErr) {
          console.error(insertErr);
          return res.status(500).json({ message: 'Internal server error' });
        }
        return res.status(201).json({ message: 'Attendance marked successfully' });
      });
    }
  });
});


// Request leave
exports.requestLeave = catchAsyncErrors(async (req, res, next) => {
  const { user_id, start_date, end_date, reason } = req.body;

  if (!user_id || !start_date || !end_date || !reason) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = 'INSERT INTO leave_requests (user_id, start_date, end_date, reason) VALUES (?, ?, ?, ?)';
  const values = [user_id, start_date, end_date, reason];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(201).json({ message: 'Leave requested successfully' });
  });
});

// Approve leave request
exports.approveLeave = catchAsyncErrors(async (req, res, next) => {
  const { leave_id } = req.body;

  if (!leave_id) {
    return res.status(400).json({ message: 'Leave ID is required' });
  }

  const query = 'UPDATE leave_requests SET status = ? WHERE leave_id = ?';
  const values = ['approved', leave_id];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json({ message: 'Leave request approved successfully' });
  });
});

// Decline leave request
exports.declineLeave = catchAsyncErrors(async (req, res, next) => {
  const { leave_id } = req.body;

  if (!leave_id) {
    return res.status(400).json({ message: 'Leave ID is required' });
  }

  const query = 'UPDATE leave_requests SET status = ? WHERE leave_id = ?';
  const values = ['declined', leave_id];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json({ message: 'Leave request declined successfully' });
  });
});
