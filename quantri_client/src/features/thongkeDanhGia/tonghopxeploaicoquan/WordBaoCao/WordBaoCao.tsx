import React from "react";
import { Typography, Row, Col, Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import { saveAs } from "file-saver";
import { AlignmentType, BorderStyle, Document, Packer, PageOrientation, Paragraph, Table, TableCell, TableRow, TextRun, VerticalAlign, WidthType } from "docx";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { IDanhMuc_ThongKeDanhGia, IDepartmentTK, IPhongTK } from "../../models";
const { Title, Text } = Typography;



const WordBaoCao: React.FC = () => {
  const dispatch = useAppDispatch();
  const { datas: thongKeDatas } = useAppSelector(
    (state) => state.danhmuc_thongkedanhgias
  );
  const toRomanNumerals = (num: number): string => {
    const romanNumerals: { [key: number]: string } = {
      1: "I",
      2: "II",
      3: "III",
      4: "IV",
      5: "V",
      6: "VI",
      7: "VII",
      8: "VIII",
      9: "IX",
      10: "X",
      11: "XI",
      12: "XII",
      13: "XIII",
      14: "XIV",
      15: "XV",
      // Bạn có thể thêm nhiều số hơn nếu cần
    };

    return romanNumerals[num] || num.toString();
  };
  const now = new Date();
  const day = now.getDate(); // Lấy ngày
  const month = now.getMonth() + 1; // Lấy tháng (tháng bắt đầu từ 0)
  const year = now.getFullYear(); // Lấy năm
  const groupByDepartments = (
    data: IDanhMuc_ThongKeDanhGia[]
  ): IDepartmentTK[] => {
    const grouped: { [key: string]: IDepartmentTK } = {};

    data.forEach((user) => {
      const { tenDonVi, maDonVi, tenPhongBan, maPhongBan } = user;

      // Nếu chưa có đơn vị trong accumulator, tạo mới
      if (!grouped[tenDonVi]) {
        grouped[tenDonVi] = {
          tenDonVi,
          maDonVi,
          phong: {},
        };
      }

      // Nếu chưa có phòng trong đơn vị, tạo mới
      if (!grouped[tenDonVi].phong[maPhongBan]) {
        grouped[tenDonVi].phong[maPhongBan] = {
          tenPhong: tenPhongBan,
          maPhong: maPhongBan,
          users: [],
        };
      }

      // Thêm người dùng vào phòng
      grouped[tenDonVi].phong[maPhongBan].users.push(user);
    });

    // Chuyển đổi từ object thành array
    return Object.values(grouped);
  };
  const generateDocx = () => {
    if (!thongKeDatas) {
      console.error("Dữ liệu không có sẵn để xuất!");
      return;
    }

    const rows = [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph(
              {
                children: [
                  new TextRun({
                    text: "STT",
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
                    text: "Họ và tên",
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
                    text: "Tổng điểm tự chấm",
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
                    text: "Tổng điểm thủ trưởng đơn vị hoặc cấp phó được giao phụ trách chấm",
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
                    text: "Mức xếp loại",
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
                    text: "Ý kiến của Thủ trưởng đơn vị hoặc cấp phó được giao phụ trách",
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
    const groupedDepartments = groupByDepartments(thongKeDatas);
    groupedDepartments.forEach((department, deptIndex) => {
      // Thêm tên đơn vị
      rows.push(
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph(
                  {
                    children: [
                      new TextRun({
                        text: `${toRomanNumerals(deptIndex + 1)}`,
                        bold: true,
                        size: 26,
                        color: "000000",
                        font: "Times New Roman",
                      }),
                    ],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 240, before: 240 },
                    indent: { left: 100, right: 100 },
                  }
                )]
            }), // Số La Mã cho chỉ số đơn vị

            new TableCell({
              children: [
                new Paragraph(
                  {
                    children: [
                      new TextRun({
                        text: department.tenDonVi,
                        bold: true,
                        size: 26,
                        color: "000000",
                        font: "Times New Roman",
                      }),
                    ],
                    alignment: AlignmentType.LEFT,
                    spacing: { after: 240, before: 240 },
                    indent: { left: 100, right: 100 },
                  })
              ],
              columnSpan: 6,
            }),
          ],
        })
      );

      Object.values(department.phong).forEach((phong) => {
        // Thêm tên phòng
        rows.push(
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph(
                  {
                    children: [
                      new TextRun({
                        text: phong.tenPhong,
                        bold: true,
                        size: 26,
                        color: "000000",
                        font: "Times New Roman",
                      }),
                    ],
                    alignment: AlignmentType.LEFT,
                    spacing: { after: 240, before: 240 },
                    indent: { left: 100, right: 100 },
                  }
                )],
                columnSpan: 6,
              }),
            ],
          })
        );

        phong.users.forEach((user, userIndex) => {
          // Thêm thông tin người dùng
          rows.push(
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({
                    children: [new TextRun({
                      text: (userIndex + 1).toString(),
                      size: 26,
                      color: "000000",
                      font: "Times New Roman",
                    }),],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 240, before: 240 },
                    indent: { left: 100, right: 100 },
                  }),],
                }),

                new TableCell({
                  children: [new Paragraph(

                    {
                      children: [
                        new TextRun({
                          text: user.hoTen,
                          size: 26,
                          color: "000000",
                          font: "Times New Roman",
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                      spacing: { after: 240, before: 240 },
                      indent: { left: 100, right: 100 },
                    }
                  )]
                }),
                new TableCell({
                  children: [new Paragraph(
                    {
                      children: [
                        new TextRun({
                          text: user.diemTuDanhGia,
                          size: 26,
                          color: "000000",
                          font: "Times New Roman",
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                      spacing: { after: 240, before: 240 },
                    })]
                }),
                new TableCell({
                  children: [new Paragraph(
                    {
                      children: [
                        new TextRun({
                          text: user.diemNhanXet,
                          size: 26,
                          color: "000000",
                          font: "Times New Roman",
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                      spacing: { after: 240, before: 240 },

                    })]
                }),
                new TableCell({
                  children: [new Paragraph(
                    {
                      children: [
                        new TextRun({
                          text: user.phanLoaiDanhGia ? user.phanLoaiDanhGia.toString() : "",
                          size: 26,
                          color: "000000",
                          font: "Times New Roman",
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                      spacing: { after: 240, before: 240 },
                    })]
                }),
                new TableCell({
                  children: [new Paragraph(
                    {
                      children: [
                        new TextRun({
                          text: user.yKien,
                          size: 26,
                          color: "000000",
                          font: "Times New Roman",
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                      spacing: { after: 240, before: 240 },
                    })]
                }),
              ],
            })
          );
        });
      });
    });

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
                  text: "ĐỀ NGHỊ ĐÁNH GIÁ, XẾP LOẠI CHẤT LƯỢNG",
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
                after: 300,
                before: 300, // Khoảng cách dòng 1.5 (1.0 khoảng 120)
              },
              children: [
                new TextRun({
                  text: "Tháng ... năm 2024",
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
                  text: "Căn cứ Quy chế đánh giá công chức, viên chức, người lao động trong Tòa án nhân dân; trên cơ sở kết quả chấm điểm của các phòng chức năng (Tòa, phòng), Tòa án nhân dân tối cao tổng hợp và báo cáo xin ý kiến của Quản trị, cụ thể như sau:",
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
                              text: "LÃNH ĐẠO TÒA ÁN NHÂN DÂN TỐI CAO",
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
      saveAs(blob, " Tổng hợp đánh giá hàng tháng của đơn vị.docx");
    });
  };


  return (
    <>
      {thongKeDatas ? (
        <>
          <div
            style={{
              marginTop: 10,
              padding: "20px",
              fontFamily: "Times New Roman, serif",
            }}
          >
            <Row gutter={16} style={{ textAlign: "center", marginBottom: 20 }}>
              <Col span={12}>
                <Title level={5} style={{ margin: 0 }}>
                  TÒA ÁN NHÂN DÂN TỐI CAO
                </Title>
              </Col>
              <Col span={12}>
                <Title level={5} style={{ margin: 0 }}>
                  CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                </Title>
                <Text
                  strong
                  style={{
                    marginTop: 5,
                    display: "block",
                    textDecoration: "underline",
                  }}
                >
                  Độc lập - Tự do - Hạnh phúc
                </Text>
              </Col>
            </Row>

            <Row style={{ textAlign: "center", marginBottom: 20 }}>
              <Col span={24}>
                <Title level={4} style={{ margin: 0, padding: "10pt" }}>
                  BẢNG TỔNG HỢP
                </Title>
                <Title level={5} style={{ margin: 0, padding: "10pt" }}>
                  ĐỀ NGHỊ ĐÁNH GIÁ, XẾP LOẠI CHẤT LƯỢNG
                </Title>
                <Title level={5} style={{ margin: 0, padding: "10pt" }}>
                  <i>Tháng {month} năm {year}</i>
                </Title>
              </Col>
            </Row>

            <Row style={{ marginBottom: 20 }}>
              <Col span={24} style={{ textAlign: "left", padding: "10pt" }}>
                <Text>
                  Căn cứ Quy chế đánh giá công chức, viên chức, người lao động
                  trong Tòa án nhân dân; trên cơ sở kết quả chấm điểm của các
                  phòng chức năng (Tòa, phòng), Tòa án nhân dân tối cao tổng hợp
                  và báo cáo xin ý kiến của Quản trị, cụ thể như sau:
                </Text>
              </Col>
            </Row>
            {/* Bảng dữ liệu */}
            <table
              width="100%"
              cellPadding="0"
              cellSpacing="0"
              style={{ borderCollapse: "collapse" }}
            >
              <thead>
                <tr style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "10pt",
                      textAlign: "center",
                    }}
                  >
                    STT
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "10pt",
                      textAlign: "center",
                    }}
                  >
                    Họ và tên
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "10pt",
                      textAlign: "center",
                    }}
                  >
                    Tổng điểm cá nhân tự chấm
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "10pt",
                      textAlign: "center",
                    }}
                  >
                    Tổng điểm thủ trưởng đơn vị hoặc cấp phó được giao phụ trách
                    chấm
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "10pt",
                      textAlign: "center",
                    }}
                  >
                    Mức xếp loại
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "10pt",
                      textAlign: "center",
                    }}
                  >
                    Ý kiến của Thủ trưởng đơn vị hoặc cấp phó được giao phụ
                    trách
                  </th>
                </tr>
              </thead>
              <tbody>
                {groupByDepartments(thongKeDatas).map(
                  (department, deptIndex) => (
                    <React.Fragment key={deptIndex}>
                      <tr>
                        <td
                          colSpan={1}
                          style={{
                            textAlign: "center",
                            padding: "10pt",
                            border: "1px solid #ddd",
                            fontWeight: "bold",
                          }}
                        >
                          {toRomanNumerals(deptIndex + 1)}
                        </td>
                        <td
                          colSpan={7}
                          style={{
                            textAlign: "left",
                            padding: "10pt",
                            border: "1px solid #ddd",
                            fontWeight: "bold",
                          }}
                        >
                          {department.tenDonVi}
                        </td>
                      </tr>
                      {Object.values(department.phong).map(
                        (phong, phongIndex) => (
                          <React.Fragment key={phongIndex}>
                            <tr>
                              <td
                                colSpan={8}
                                style={{
                                  textAlign: "left",
                                  padding: "10pt",
                                  border: "1px solid #ddd",
                                  fontWeight: "bold",
                                }}
                              >
                                {phong.tenPhong}
                              </td>
                            </tr>
                            {phong.users.map((user, userIndex) => (
                              <tr key={userIndex}>
                                <td
                                  style={{
                                    textAlign: "center",
                                    padding: "10pt",
                                    border: "1px solid #ddd",
                                  }}
                                >
                                  {userIndex + 1}
                                </td>
                                <td
                                  style={{
                                    textAlign: "left",
                                    padding: "10pt",
                                    border: "1px solid #ddd",
                                  }}
                                >
                                  {user.hoTen}
                                </td>
                                <td
                                  style={{
                                    textAlign: "center",
                                    padding: "10pt",
                                    border: "1px solid #ddd",
                                  }}
                                >
                                  {user.diemTuDanhGia}
                                </td>
                                <td
                                  style={{
                                    textAlign: "center",
                                    padding: "10pt",
                                    border: "1px solid #ddd",
                                  }}
                                >
                                  {user.diemNhanXet}
                                </td>
                                <td
                                  style={{
                                    textAlign: "center",
                                    padding: "10pt",
                                    border: "1px solid #ddd",
                                  }}
                                >
                                  {user.phanLoaiDanhGia}
                                </td>
                                <td
                                  style={{
                                    textAlign: "left",
                                    padding: "10pt",
                                    border: "1px solid #ddd",
                                  }}
                                >
                                  {user.yKien}
                                </td>
                              </tr>
                            ))}
                          </React.Fragment>
                        )
                      )}
                    </React.Fragment>
                  )
                )}
              </tbody>
            </table>

            {/* Ngày tháng và người ký */}
            <Row style={{ marginTop: 20 }}>
              <Col span={12} style={{ textAlign: "center" }}></Col>
              <Col span={12} style={{ textAlign: "center" }}>
                <Text>......., ngày {day} tháng {month} năm {year}</Text>
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col span={12} style={{ textAlign: "center" }}></Col>
              <Col span={12} style={{ textAlign: "center" }}>
                <Text strong style={{ fontSize: 14 }}>
                  LÃNH ĐẠO TÒA ÁN NHÂN DÂN TỐI CAO
                </Text>
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
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default WordBaoCao;
