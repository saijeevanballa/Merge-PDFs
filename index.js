const hummus = require("hummus");
const memoryStreams = require("memory-streams");
const fs = require("fs");
const path = require("path");

async function combinePdfs(filePaths, options) {
  if (filePaths.length < 2) {
    throw new Error("Minimun two files required");
  }
  let name =
    options && options.outName
      ? options.outName
      : `merged-pdf-${new Date().getTime()}`;
  let local =
    options && options.outPath
      ? options.outPath
      : path.join(
          __dirname,
          filePaths[0]
            .split("/")
            .slice(0, -1)
            .join()
        );
  let fileBuffers = filePaths.map(filePath => fs.readFileSync(filePath));
  const outStream = new memoryStreams.WritableStream();
  try {
    let fileStreams = fileBuffers.map((fileBuffer, i) => ({
      data: new hummus.PDFRStreamForBuffer(fileBuffer),
      index: i
    }));
    let pdfWriter;
    for (const data of fileStreams) {
      if (data.index === 0) {
        pdfWriter = hummus.createWriterToModify(
          data.data,
          new hummus.PDFStreamForResponse(outStream)
        );
      } else {
        pdfWriter.appendPDFPagesFromPDF(data.data);
      }
    }
    pdfWriter.end();
    const newBuffer = outStream.toBuffer();
    outStream.end();
    fs.writeFileSync(path.join(local, `${name}.pdf`), newBuffer);
    return newBuffer;
  } catch (error) {
    outStream.end();
    throw new Error(error);
  }
}

module.exports = combinePdfs;
