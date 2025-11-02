const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'public');
const outputPath = path.join(outputDir, 'brochure.pdf');

const streamContent = `BT
/F1 24 Tf
72 680 Td
(KopruMezun Tanitim Brosuru) Tj
ET
`;

const buildPdf = () => {
  let body = '%PDF-1.4\n';
  const offsets = [0];

  const addObject = (index, content) => {
    const offset = Buffer.byteLength(body, 'utf8');
    offsets[index] = offset;
    body += `${index} 0 obj\n${content}\nendobj\n`;
  };

  addObject(1, '<< /Type /Catalog /Pages 2 0 R >>');
  addObject(2, '<< /Type /Pages /Count 1 /Kids [3 0 R] >>');
  addObject(
    3,
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
  );

  const streamLength = Buffer.byteLength(streamContent, 'utf8');
  addObject(4, `<< /Length ${streamLength} >>\nstream\n${streamContent}endstream`);
  addObject(5, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');

  const xrefOffset = Buffer.byteLength(body, 'utf8');
  body += 'xref\n';
  body += `0 ${offsets.length}\n`;
  body += '0000000000 65535 f \n';

  for (let i = 1; i < offsets.length; i += 1) {
    body += `${offsets[i].toString().padStart(10, '0')} 00000 n \n`;
  }

  body += 'trailer\n';
  body += `<< /Size ${offsets.length} /Root 1 0 R >>\n`;
  body += 'startxref\n';
  body += `${xrefOffset}\n`;
  body += '%%EOF';

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputPath, body, { encoding: 'binary' });
};

buildPdf();
