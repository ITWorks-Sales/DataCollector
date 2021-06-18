import { getCurrentList } from "../../localStorageInteraction/currentList";

export default async function downloadCsv() {
  const datasets = (await getCurrentList()).map((dataSet) => [
    dataSet.message,
    dataSet.tags,
  ]);

  const rows = [["message", "tags"], ...datasets];

  let csvContent = "data:text/csv;charset=utf-8,";

  for (var i = 0; i < rows.length; i++) {
    csvContent += processRow(rows[i]);
  }

  console.log(csvContent);

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "dataset.csv");
  document.body.appendChild(link); // Required for FF

  link.click(); // This will download the data file named "my_data.csv".
}
const processRow = (row: any) => {
  let finalVal = "";
  for (let j = 0; j < row.length; j++) {
    let innerValue = row[j] === null ? "" : row[j].toString();
    if (row[j] instanceof Date) {
      innerValue = row[j].toLocaleString();
    }
    let result = innerValue.replace(/"/g, '""');
    if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
    if (j > 0) finalVal += ",";
    finalVal += result;
  }
  return finalVal + "\n";
};
