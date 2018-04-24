import * as fs from 'fs';
import PDFJS from 'pdfjs-dist';

export default function saveImage(data, imagePath) {
  return new Promise((resolve) => {
    PDFJS.disableWorker = true;
    const CANVAS = document.createElement('canvas');
    const CTX = CANVAS.getContext('2d');

    PDFJS.getDocument(data).then((pdfDoc) => {
      pdfDoc.getPage(1).then((page) => {
        const viewport = page.getViewport(300 / page.getViewport(1).width);

        CANVAS.width = 300;
        CANVAS.height = viewport.height;

        const renderContext = {
          canvasContext: CTX,
          viewport,
        };

        page.render(renderContext).then(() => {
          const base64Data = CANVAS.toDataURL('image/jpeg', 1).replace(
            /^data:image\/jpeg;base64,/,
            '',
          );
          fs.writeFileSync(imagePath, base64Data, 'base64');
          CANVAS.remove();
          pdfDoc.getMetadata().then(meta =>
            resolve({
              meta,
              pageCount: pdfDoc.numPages || pdfDoc.pdfInfo.numPages || 0,
            }),
          );
        });
      });
    });
  });
}
