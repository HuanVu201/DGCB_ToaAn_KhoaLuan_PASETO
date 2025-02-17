import React, { useEffect, useState } from 'react';
import { Typography, Row, Col, Table as TableView, Divider } from 'antd';
import { useAppSelector } from '@/lib/redux/Hooks';
import { userInfo } from 'os';
import { ILstUsers } from '@/features/lstusers/models';
import { AlignmentType, BorderStyle, Document, Packer, PageOrientation, Paragraph, Table, TableCell, TableRow, TextRun, VerticalAlign, WidthType } from "docx";
import { saveAs } from "file-saver";
import { PrinterOutlined } from '@ant-design/icons';
import { months } from 'moment';
import { YEAR } from '@/data';

const { Title, Text } = Typography;
interface WordBaoCaoProps {
  selectIdUser?: string | null; // Hoặc kiểu phù hợp với dữ liệu của bạn
}
const columns = [
  {
    title: 'Tháng',
    dataIndex: 'thang',
    key: 'thang',
  },
  {
    title: 'Số điểm',
    dataIndex: 'diemDanhGia',
    key: 'diemDanhGia',
  },
  {
    title: 'Xếp loại',
    dataIndex: 'xepLoai',
    key: 'xepLoai',
  },
];

const WordBaoCao: React.FC<WordBaoCaoProps> = ({ selectIdUser }) => {
  const { datas: lstusers } = useAppSelector(
    (state) => state.lstusers
  );
  const { dataGetTongHopCaNhan: thongKeDatas } = useAppSelector(
    (state) => state.danhmuc_thongkedanhgias
  );
  const [inforUser, setInforUser] = useState<ILstUsers | null>(null);
  const now = new Date();
  const day = now.getDate(); // Lấy ngày
  const month = now.getMonth() + 1; // Lấy tháng (tháng bắt đầu từ 0)
  const year = now.getFullYear(); // Lấy năm
  useEffect(() => {
    if (selectIdUser) {
      const user = lstusers?.find(item => item.id === selectIdUser);
      setInforUser(user || null); // Update state with user info
    } else {
      setInforUser(null); // Reset if no user ID is provided
    }
  }, [selectIdUser, lstusers]);
  const hasData = inforUser && thongKeDatas !== undefined;
  const generateDocx = () => {
    if (!thongKeDatas) {
      console.error("Dữ liệu không có sẵn để xuất!");
      return;
    }

    const headerRows = [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph(
              {
                children: [
                  new TextRun({
                    text: "Tháng",
                    bold: true,
                    size: 26,
                    color: "000000",
                    font: "Times New Roman",
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 240, before: 240 },
              })], shading: {
                fill: "D3D3D3", // Màu nền xám cho ô
              }, verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [new Paragraph(
              {
                children: [
                  new TextRun({
                    text: "Số điểm",
                    bold: true,
                    size: 26,
                    color: "000000",
                    font: "Times New Roman",
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 240, before: 240 },
              })], shading: {
                fill: "D3D3D3", // Màu nền xám cho ô
              }, verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [new Paragraph(
              {
                children: [
                  new TextRun({
                    text: "Xếp loại",
                    bold: true,
                    size: 26,
                    color: "000000",
                    font: "Times New Roman",
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 240, before: 240 },
              })], shading: {
                fill: "D3D3D3", // Màu nền xám cho ô
              }, verticalAlign: VerticalAlign.CENTER,
          }),
        ],

      }),
    ];
    // Tạo hàng dữ liệu từ thongKeDatas
    const dataRows = thongKeDatas.map(item => (
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph(
              {
                children: [
                  new TextRun({
                    text: item.thang || "",
                    size: 26,
                    color: "000000",
                    font: "Times New Roman",
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 240, before: 240 },
              })
            ], // Giả sử item có thuộc tính 'thang'
          }),
          new TableCell({
            children: [new Paragraph(
              {
                children: [
                  new TextRun({
                    text: item.diemDanhGia || "",
                    size: 26,
                    color: "000000",
                    font: "Times New Roman",
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 240, before: 240 },
              })
            ], // Giả sử item có thuộc tính 'diemDanhGia'
          }),
          new TableCell({
            children: [new Paragraph(
              {
                children: [
                  new TextRun({
                    text: item.xepLoai || "",
                    size: 26,
                    color: "000000",
                    font: "Times New Roman",
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 240, before: 240 },
              })
            ], // Giả sử item có thuộc tính 'xepLoai'
          }),
        ],
      })
    ));
    // Kết hợp tiêu đề và dữ liệu thành một bảng
    const rows = [...headerRows, ...dataRows];
    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              size: {
                width: 16840, // Kích thước A4 chiều ngang
                height: 11900,
                orientation: PageOrientation.PORTRAIT, // Chiều ngang
              },
              margin: {
                top: 720,
                right: 720,
                bottom: 720,
                left: 720,
              },
            },
          },
          children: [
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      width: { size: 8420, type: WidthType.DXA },
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "TÒA ÁN NHÂN DÂN TỐI CAO",
                              bold: true,
                              size: 22,
                              color: "000000",
                              font: "Times New Roman",
                            }),
                          ],
                          alignment: AlignmentType.CENTER,
                        }),
                        new Paragraph({
                          spacing: {
                            after: 300, // Khoảng cách dòng 1.5 (1.0 khoảng 120)
                          },
                          children: [
                            new TextRun({
                              text: "*",
                              bold: true, // In đậm
                              size: 22, // Cỡ chữ 11pt (22 half-points)
                              color: "000000", // Màu đen
                              font: "Times New Roman", // Kiểu chữ
                            }),
                          ],
                          heading: "Heading1", // Tiêu đề
                          alignment: AlignmentType.CENTER, // Căn giữa
                        }),
                      ],
                      borders: {
                        top: { style: BorderStyle.NONE, size: 0 },
                        bottom: { style: BorderStyle.NONE, size: 0 },
                        left: { style: BorderStyle.NONE, size: 0 },
                        right: { style: BorderStyle.NONE, size: 0 },
                      },
                    }),
                    new TableCell({
                      width: { size: 8420, type: WidthType.DXA }, // Cột 2 rộng 50%
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM",
                              bold: true,
                              size: 22,
                              color: "000000",
                              font: "Times New Roman",
                            }),
                          ],
                          alignment: AlignmentType.CENTER,
                        }),
                        new Paragraph({
                          spacing: {
                            after: 300, // Khoảng cách dòng 1.5 (1.0 khoảng 120)
                          },
                          children: [
                            new TextRun({
                              text: "Độc lập - Tự do - Hạnh phúc",
                              bold: true, // In đậm
                              size: 22, // Cỡ chữ 11pt (22 half-points)
                              color: "000000", // Màu đen
                              font: "Times New Roman", // Kiểu chữ
                              underline: {} // Gạch chân
                            }),
                          ],
                          heading: "Heading1", // Tiêu đề
                          alignment: AlignmentType.CENTER, // Căn giữa
                        }),
                      ],
                      borders: {
                        top: { style: BorderStyle.NONE, size: 0 },
                        bottom: { style: BorderStyle.NONE, size: 0 },
                        left: { style: BorderStyle.NONE, size: 0 },
                        right: { style: BorderStyle.NONE, size: 0 },
                      },
                    }),
                  ],

                }),
              ],
              borders: {
                top: { style: BorderStyle.NONE },
                bottom: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
                insideVertical: { style: BorderStyle.NONE }, // Loại bỏ đường kẻ dọc giữa các cột 
                insideHorizontal: { style: BorderStyle.NONE },
              },
            }),


            new Paragraph({
              spacing: {
                line: 240, // Khoảng cách dòng 1.5 (1.0 khoảng 120)
              },
              children: [
                new TextRun({
                  text: "BẢNG TỔNG HỢP",
                  bold: true, // In đậm
                  size: 30, // Cỡ chữ 15pt
                  color: "000000", // Màu đen
                  font: "Times New Roman", // Kiểu chữ
                }),
              ],
              heading: "Heading1", // Tiêu đề
              alignment: AlignmentType.CENTER, // Căn giữa
            }),
            new Paragraph({
              spacing: {
                line: 240, // Khoảng cách dòng 1.5 (1.0 khoảng 120)
              },
              children: [
                new TextRun({
                  text: "KẾT QUẢ ĐÁNH GIÁ, XẾP LOẠI CHẤT LƯỢNG HẰNG THÁNG",
                  bold: true, // In đậm
                  size: 30, // Cỡ chữ 15pt
                  color: "000000", // Màu đen
                  font: "Times New Roman", // Kiểu chữ
                }),
              ],
              heading: "Heading1", // Tiêu đề
              alignment: AlignmentType.CENTER, // Căn giữa
            }),

            new Paragraph({
              spacing: {
                line: 240, // Khoảng cách dòng 1.5 (1.0 khoảng 120)
              },
              children: [
                new TextRun({
                  text: `Họ và tên : ${inforUser?.fullName}`,
                  size: 26, // Cỡ chữ 14pt
                  color: "000000", // Màu đen
                  font: "Times New Roman", // Kiểu chữ
                }),
              ],
              heading: "Heading1", // Tiêu đề
              alignment: AlignmentType.LEFT, // Căn giữa
            }),
            new Paragraph({
              spacing: {
                line: 240, // Khoảng cách dòng 1.5 (1.0 khoảng 120)
              },
              children: [
                new TextRun({
                  text: `Chức vụ : ${inforUser?.chucVu}`,
                  size: 26, // Cỡ chữ 14pt
                  color: "000000", // Màu đen
                  font: "Times New Roman", // Kiểu chữ
                }),
              ],
              heading: "Heading1", // Tiêu đề
              alignment: AlignmentType.LEFT, // Căn giữa
            }),
            new Paragraph({
              spacing: {
                line: 240, // Khoảng cách dòng 1.5 (1.0 khoảng 120)
              },
              children: [
                new TextRun({
                  text: `Kết quả đánh giá, xếp loại chất lượng hằng tháng như sau:`,
                  size: 26, // Cỡ chữ 14pt
                  color: "000000", // Màu đen
                  font: "Times New Roman", // Kiểu chữ
                }),
              ],
              heading: "Heading1", // Tiêu đề
              alignment: AlignmentType.LEFT, // Căn giữa
            }),
            new Paragraph({
              spacing: {
                after: 300, // Khoảng cách dòng 1.5 (1.0 khoảng 120)
              },
              children: [
                new TextRun({
                  text: "",
                  bold: true, // In đậm
                  size: 22, // Cỡ chữ 11pt (22 half-points)
                  color: "000000", // Màu đen
                  font: "Times New Roman", // Kiểu chữ
                }),
              ],
              heading: "Heading1", // Tiêu đề
              alignment: AlignmentType.CENTER, // Căn giữa
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: rows,
            }),
            new Paragraph({
              spacing: {
                after: 300, // Khoảng cách dòng 1.5 (1.0 khoảng 120)
              },
              children: [
                new TextRun({
                  text: "",
                  bold: true, // In đậm
                  size: 26, // Cỡ chữ 14pt
                  color: "000000", // Màu đen
                  font: "Times New Roman", // Kiểu chữ
                  italics: true, // Đặt thuộc tính in nghiêng
                }),
              ],
              heading: "Heading1", // Tiêu đề
              alignment: AlignmentType.CENTER, // Căn giữa
            }),
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      width: { size: 8420, type: WidthType.DXA },
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "",
                              bold: true,
                              size: 22,
                              color: "000000",
                              font: "Times New Roman",
                            }),
                          ],
                          alignment: AlignmentType.CENTER,
                        }),
                        new Paragraph({
                          spacing: {
                            after: 300, // Khoảng cách dòng 1.5 (1.0 khoảng 120)
                          },
                          children: [
                            new TextRun({
                              text: "",
                              bold: true, // In đậm
                              size: 22, // Cỡ chữ 11pt (22 half-points)
                              color: "000000", // Màu đen
                              font: "Times New Roman", // Kiểu chữ
                            }),
                          ],
                          heading: "Heading1", // Tiêu đề
                          alignment: AlignmentType.CENTER, // Căn giữa
                        }),
                      ],
                      borders: {
                        top: { style: BorderStyle.NONE, size: 0 },
                        bottom: { style: BorderStyle.NONE, size: 0 },
                        left: { style: BorderStyle.NONE, size: 0 },
                        right: { style: BorderStyle.NONE, size: 0 },
                      },
                    }),
                    new TableCell({
                      width: { size: 8420, type: WidthType.DXA }, // Cột 2 rộng 50%
                      children: [
                        new Paragraph({
                          spacing: {
                            after: 300, // Khoảng cách dòng 1.5 (1.0 khoảng 120)
                          },
                          children: [
                            new TextRun({
                              text: `......., ngày ${day} tháng ${month} năm ${year}`,
                              size: 22, // Cỡ chữ 11pt (22 half-points)
                              color: "000000", // Màu đen
                              font: "Times New Roman", // Kiểu chữ
                            }),
                          ],
                          heading: "Heading1", // Tiêu đề
                          alignment: AlignmentType.CENTER, // Căn giữa
                        }),
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "Người báo cáo",
                              bold: true,
                              size: 22,
                              color: "000000",
                              font: "Times New Roman",
                            }),
                          ],
                          alignment: AlignmentType.CENTER,
                        }),
                      ],
                      borders: {
                        top: { style: BorderStyle.NONE, size: 0 },
                        bottom: { style: BorderStyle.NONE, size: 0 },
                        left: { style: BorderStyle.NONE, size: 0 },
                        right: { style: BorderStyle.NONE, size: 0 },
                      },
                    }),
                  ],

                }),
              ],
              borders: {
                top: { style: BorderStyle.NONE },
                bottom: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
                insideVertical: { style: BorderStyle.NONE }, // Loại bỏ đường kẻ dọc giữa các cột 
                insideHorizontal: { style: BorderStyle.NONE },
              },
            }),

          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "Tổng hợp đánh giá , xếp loại chất lượng hằng tháng của công chức viên chức.docx");
    });
  };

  return (
    <>
      {hasData ? (<>
        <div style={{ marginTop: 10, padding: '20px', fontFamily: 'Times New Roman, serif', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <Row gutter={16} align="middle">
            <Col span={12} style={{ textAlign: "center" }}>
              <Title level={5} style={{ margin: 0 }}>TÒA ÁN NHÂN DÂN TỐI CAO</Title>
            </Col>
            <Col span={12} style={{ textAlign: "center" }}>
              <Title level={5} style={{ margin: 0 }}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</Title>
            </Col>
          </Row>
          <Divider style={{ margin: '10px 0' }} />
          <Row style={{ textAlign: "center", marginTop: 10 }}>
            <Col span={24}>
              <Title level={4} style={{ margin: 0 }}>BẢNG TỔNG HỢP</Title>
              <Title level={4} style={{ margin: 0 }}>KẾT QUẢ ĐÁNH GIÁ, XẾP LOẠI CHẤT LƯỢNG HẰNG THÁNG</Title>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col span={24}>
              <Text style={{ fontSize: 13 }}>Họ và tên: {inforUser.fullName}</Text><br />
              <Text style={{ fontSize: 13 }}>Chức vụ, chức danh: {inforUser.chucVu}</Text><br />
              <Text style={{ fontSize: 13 }}>Kết quả đánh giá, xếp loại chất lượng hằng tháng như sau:</Text>
            </Col>
          </Row>

          <TableView
            columns={columns}
            dataSource={thongKeDatas}
            pagination={false}
            bordered
            style={{ marginTop: 20, borderRadius: '8px', overflow: 'hidden' }}
            rowClassName="ViewTT"
            scroll={{ x: true }}
          />

          <Divider style={{ margin: '20px 0' }} />
          <Row>
            <Col span={12} style={{ textAlign: "left" }}>
              <Text></Text>
            </Col>
            <Col span={12} style={{ textAlign: "center" }}>
              <Text style={{ fontSize: 13 }}>......., ngày {day} tháng {month} năm {year}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ textAlign: "left" }}>
              <Text></Text>
            </Col>
            <Col span={12} style={{ textAlign: "center" }}>
              <Text strong style={{ fontSize: 13 }}>Người báo cáo</Text>
            </Col>
          </Row>
        </div>
        <button onClick={generateDocx}
          className="btnIn"
          style={{
            padding: "10px 20px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        // onClick={() => handlePrint()} // Thêm hàm in nếu cần
        >
          <PrinterOutlined />
          <span> In</span>
        </button>
      </>) : (<></>)}

    </>
  );
};

export default WordBaoCao;
