import dayjs from 'dayjs'
import jsPDF from 'jspdf';
import { ScanFileList } from '../contexts/ScanContext';
const isValidDate = (date: Date) => {
    if (Object.prototype.toString.call(date) === "[object Date]") {
        // it is a date
        if (isNaN(date.valueOf())) { // d.getTime() or d.valueOf() will also work
            // date object is not valid
            return false;
        } else {
            // date object is valid
            return true;
        }
    } else {
        // not a date object
        return false;
    }
}

export const formatDateStringToDate = (dateStr: string) => {
    // Tìm các số trong chuỗi
    var numbers = dateStr.match(/\d+/g);
    console.log(numbers);

    // Nếu có các số, sử dụng chúng để tạo đối tượng Date
    if (numbers && numbers.length >= 3) {
        var year = parseInt(numbers[2], 10);
        var month = parseInt(numbers[1], 10) - 1; // Tháng trong JavaScript bắt đầu từ 0
        var day = parseInt(numbers[0], 10);
        console.log(year, month, day);
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        var milliseconds = now.getMilliseconds();
        // Chuyển đổi thành đối tượng Date
        var dateObject = new Date(year, month, day, hours,minutes,seconds, milliseconds);
        if (isValidDate(dateObject)) {
            return dayjs(dateObject)
        }
        return dayjs()
    }
    return dayjs()
}

function resetOrientation(srcBase64: string, srcOrientation: number, callback: (value: string) => void) {
    if(srcOrientation <= 0) {
        callback(srcBase64)
    }
    var img = new Image();    
  
    img.onload = function() {
      var width = img.width,
          height = img.height,
          canvas = document.createElement('canvas'),
          ctx = canvas.getContext("2d")!;
  
      // set proper canvas dimensions before transform & export
      if (4 < srcOrientation && srcOrientation < 9) {
        canvas.width = height;
        canvas.height = width;
      } else {
        canvas.width = width;
        canvas.height = height;
      }
      // alert(JSON.stringify({canvas: true, w: canvas.width, h: canvas.height}))
  
      // transform context before drawing image
      switch (srcOrientation) {
        case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
        case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
        case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
        case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
        case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
        case 7: ctx.transform(0, -1, -1, 0, height, width); break;
        case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
        default: break;
      }
  
      // draw image
      ctx.drawImage(img, 0, 0);
  
      // export base64
      callback(canvas.toDataURL());
    };
  
    img.src = srcBase64;
  };

export const getOrientation = (file: ArrayBuffer, callback: (rotation: number) => void) => {
    var reader = new FileReader();
  
    reader.onload = (event: ProgressEvent) => {
  
      if (! event.target) {
        return;
      }
  
      const view = new DataView(file);
  
      if (view.getUint16(0, false) != 0xFFD8) {
          return callback(-2);
      }
  
      const length = view.byteLength
      let offset = 2;
  
      while (offset < length)
      {
          if (view.getUint16(offset+2, false) <= 8) return callback(-1);
          let marker = view.getUint16(offset, false);
          offset += 2;
  
          if (marker == 0xFFE1) {
            if (view.getUint32(offset += 2, false) != 0x45786966) {
              return callback(-1);
            }
  
            let little = view.getUint16(offset += 6, false) == 0x4949;
            offset += view.getUint32(offset + 4, little);
            let tags = view.getUint16(offset, little);
            offset += 2;
            for (let i = 0; i < tags; i++) {
              if (view.getUint16(offset + (i * 12), little) == 0x0112) {
                return callback(view.getUint16(offset + (i * 12) + 8, little));
              }
            }
          } else if ((marker & 0xFF00) != 0xFF00) {
              break;
          }
          else {
              offset += view.getUint16(offset, false);
          }
      }
      return callback(-1);
    };
  
    reader.readAsArrayBuffer(new Blob([new Uint8Array(file, 512, length)]));
  }

export async function addImageFromBase64ToPDF(doc: jsPDF, file: ScanFileList) {
    return new Promise((resolve: (data: {
        base64: string;
        type: string;
        x: number;
        y: number;
        w: number;
        h: number;
    }) => void, reject) => {
        var binary = atob(file.base64.split(',')[1]);
        var arrayBuffer = new ArrayBuffer(binary.length);
        var byteArray = new Uint8Array(arrayBuffer);
        for (var i = 0; i < binary.length; i++) {
            byteArray[i] = binary.charCodeAt(i);
        }

        getOrientation(arrayBuffer, (rotation) => {
            const maxWidth = doc.internal.pageSize.getWidth();
            const maxHeight = doc.internal.pageSize.getHeight();
            const x = (doc.internal.pageSize.getWidth() - maxWidth) / 2;
            const y = (doc.internal.pageSize.getHeight() - maxHeight) / 2;
            // alert(JSON.stringify({doc: true, w: maxWidth, h: maxHeight}))
            resetOrientation(file.base64, rotation, (newBase64) => {
                const img = new Image();
                img.onload = () => {
                    const data = {
                        base64: newBase64,
                        type: file.type,
                        x,
                        y,
                        w: maxWidth,
                        h: maxHeight
                    }
                    resolve(data);
                };
                img.src = newBase64;
            });
        });
    });
    
}

//w210
//h290

//w4032
//h3024