import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * Export data to Excel (.xlsx)
 * @param {Array} data - Array of objects to export
 * @param {String} fileName - Name of the file
 */
export const exportToExcel = (data, fileName = 'report') => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${fileName}_${new Date().getTime()}.xlsx`);
};

/**
 * Export data to PDF (.pdf)
 * @param {Array} columns - Array of strings for headers
 * @param {Array} rows - Array of arrays for data
 * @param {String} fileName - Name of the file
 * @param {Object} options - { title, subtitle, theme }
 */
export const exportToPdf = (columns, rows, fileName = 'report', options = {}) => {
    const doc = jsPDF({ orientation: 'portrait' });
    const { title = 'Business Report', subtitle = '', theme = 'striped' } = options;

    // Add Title
    doc.setFontSize(18);
    doc.text(title, 14, 22);
    
    // Add Subtitle/Date
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(subtitle || `Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    // AutoTable
    doc.autoTable({
        head: [columns],
        body: rows,
        startY: 35,
        theme: theme,
        headStyles: { fillColor: [16, 185, 129] }, // Emerald color
        margin: { top: 35 },
    });

    doc.save(`${fileName}_${new Date().getTime()}.pdf`);
};

/**
 * Handle Browser Print
 */
export const handleBrowserPrint = () => {
    window.print();
};
