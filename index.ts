import hummus from "hummus";
import memoryStreams from "memory-streams";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

export default function mergePdfs(
  filePaths: string[],
  options?: { outName: string; outPath: string }
) {
  if (filePaths.length < 2) {
    throw new Error("Minimun two files required");
  }
  let name =
    options && options.outName
      ? options.outName
      : `merged-pdf-${new Date().getTime()}`;
  let path =
    options && options.outPath
      ? options.outPath
      : filePaths[0]
          .split("/")
          .splice(-2)
          .join(",");
  let fileBuffers = filePaths.map(filePath => readFileSync(filePath));
  const outStream = new memoryStreams.WritableStream();
  try {
    let fileStreams = fileBuffers.map(
      fileBuffer => new hummus.PDFRStreamForBuffer(fileBuffer)
    );
    const pdfWriter = fileStreams.reduce((main, curr, index) => {
      return index === 0
        ? hummus.createWriterToModify(
            curr,
            new hummus.PDFStreamForResponse(outStream)
          )
        : main.appendPDFPagesFromPDF(curr);
    }, 0);
    pdfWriter.end();
    const newBuffer = outStream.toBuffer();
    outStream.end();
    writeFileSync(join(path, name), newBuffer);
    return newBuffer;
  } catch (error) {
    outStream.end();
    throw new Error(error);
  }
}
