// Downlaod mailbox details
export async function downloadMailboxes(data: any) {
  // const data = value.value;

  if (!data || data.length === 0) {
    console.warn("No data available to download.");
    return;
  }

  // 1. Get all unique keys from the first object
  const headers = Object.keys(data[0]);

  // 2. Build the CSV content
  const csvContent = [
    // Header row
    headers.join(","),
    // Data rows
    ...data.map((row) =>
      headers
        .map((header) => {
          const cell = row[header] ?? ""; // Handle null/undefined
          // Escape quotes and wrap in quotes to handle commas within values
          return `"${String(cell).replace(/"/g, '""')}"`;
        })
        .join(","),
    ),
  ].join("\r\n");

  // 3. Create the file and trigger download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", `mailboxes_export_${Date.now()}.csv`);

  document.body.appendChild(link);
  link.click();

  // 4. Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
