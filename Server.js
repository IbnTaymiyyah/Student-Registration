const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

let records = [];

app.use(bodyParser.json());
app.use(express.static('public')); "public"


app.get('/api/records', (req, res) => {
  res.json(records);
})function editRecord(index) {
  console.log("Editing record at index:", index);
  const recordToEdit = records[index];
  if (recordToEdit) {
    nameInput.value = recordToEdit.name || '';
    ageInput.value = recordToEdit.age || '';
    emailInput.value = recordToEdit.email || '';
    editIndexInput.value = index;
    console.log("Record loaded into form for editing:", recordToEdit); 
  } else {
    console.error("No record found at index:", index); 
  }
}

async function deleteRecord(index) {
  await fetch(`/api/records/${index}`, {
    method: 'DELETE'
  });
  fetchRecords();
}

searchInput.addEventListener('input', function (e) {
  fetchRecords(e.target.value);
});

fetchRecords();


app.post('/api/records', (req, res) => {
  const record = req.body;
  records.push(record);
  res.json(record);
});


app.put('/api/records/:index', (req, res) => {
  const { index } = req.params;
  const updatedRecord = req.body;
  records[index] = updatedRecord;
  res.json(updatedRecord);
});

app.delete('/api/records/:index', (req, res) => {
  const { index } = req.params;
  records.splice(index, 1);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
