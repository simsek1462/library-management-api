const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes = require('./routes/borrowRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/users', borrowRoutes);

sequelize.sync({ alter: true }).then(() => {
    console.log('Databasesynced');
    app.listen(3000, () =>
        console.log('Server running on http://localhost:3000'));
});
