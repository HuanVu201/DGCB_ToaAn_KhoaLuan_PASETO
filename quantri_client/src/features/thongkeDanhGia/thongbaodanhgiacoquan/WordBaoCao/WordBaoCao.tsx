import React from "react";
import { Typography, Row, Col } from "antd";
import { useAppSelector } from "@/lib/redux/Hooks";
import { IDanhMuc_ThongKeDanhGia_DuLieuPhieuCQ } from "../../models";
import { saveAs } from "file-saver";
import { AlignmentType, BorderStyle, Document, Packer, PageOrientation, PageSize, Paragraph, Table, TableCell, TableRow, TextRun, VerticalAlign, WidthType } from "docx";
import { PrinterOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

// Định nghĩa kiểu dữ liệu
interface DataType {
  type: "header" | "subheader" | "row";
  stt?: number;
  name?: string;
  position?: string;
  selfScore?: string;
  result?: string;
  reason?: string;
}


// Dữ liệu mặc định
const datadefault: IDanhMuc_ThongKeDanhGia_DuLieuPhieuCQ[] = [
  {
    hoVaTen: "Phan Báu",
    thuTuPB: 100,
    thuTuND: 1,
    taiKhoan: "079068035896",
    chucVu: "Thẩm phán",
    xepLoaiTuDG: "Loại B- Hoàn thành tốt nhiệm vụ",
    diemDanhGia: null,
    xepLoaiDG: null,
    truongDonVi: "0",
    lyDo: "",
    tenDonVi: "Toà án nhân dân thành phố Hồ Chí Minh",
    tenPhongBan: "Phòng Kiểm tra nghiệp vụ và Thi hành án",
    maPhongBan: "000.09.59.T99",
    maDonVi: "000.00.59.T99",
    maNguoiDung: "6dc4d812-3d51-4323-b263-e6a92f83add7",
  },
  {
    hoVaTen: "Trần Văn A",
    thuTuPB: 101,
    thuTuND: 2,
    taiKhoan: "079068035897",
    chucVu: "Kiểm sát viên",
    xepLoaiTuDG: "Loại A- Xuất sắc",
    diemDanhGia: 95,
    xepLoaiDG: "Xuất sắc",
    truongDonVi: "1",
    lyDo: "Hoàn thành xuất sắc nhiệm vụ",
    tenDonVi: "Viện kiểm sát nhân dân tối cao",
    tenPhongBan: "Phòng Hình sự",
    maPhongBan: "000.09.59.T100",
    maDonVi: "000.00.59.T100",
    maNguoiDung: "6dc4d812-3d51-4323-b263-e6a92f83add8",
  },
  {
    hoVaTen: "Nguyễn Văn B",
    thuTuPB: 102,
    thuTuND: 3,
    taiKhoan: "079068035898",
    chucVu: "Thư ký",
    xepLoaiTuDG: "Loại C- Cần cải thiện",
    diemDanhGia: 70,
    xepLoaiDG: "Khá",
    truongDonVi: "1",
    lyDo: "Cần nâng cao kỹ năng",
    tenDonVi: "Viện kiểm sát nhân dân tối cao",
    tenPhongBan: "Phòng Dân sự",
    maPhongBan: "000.09.59.T101",
    maDonVi: "000.00.59.T101",
    maNguoiDung: "6dc4d812-3d51-4323-b263-e6a92f83add9",
  },
  {
    hoVaTen: "Lê Thị C",
    thuTuPB: 103,
    thuTuND: 4,
    taiKhoan: "079068035899",
    chucVu: "Luật sư",
    xepLoaiTuDG: "Loại B- Hoàn thành tốt nhiệm vụ",
    diemDanhGia: 88,
    xepLoaiDG: "Tốt",
    truongDonVi: "2",
    lyDo: "Hoàn thành nhiệm vụ",
    tenDonVi: "Văn phòng luật sư ABC",
    tenPhongBan: "Phòng Tư vấn pháp lý",
    maPhongBan: "000.09.59.T102",
    maDonVi: "000.00.59.T102",
    maNguoiDung: "6dc4d812-3d51-4323-b263-e6a92f83adda",
  },
  {
    hoVaTen: "Nguyễn Thị D",
    thuTuPB: 104,
    thuTuND: 5,
    taiKhoan: "079068035900",
    chucVu: "Phó phòng",
    xepLoaiTuDG: "Loại A- Xuất sắc",
    diemDanhGia: 90,
    xepLoaiDG: "Xuất sắc",
    truongDonVi: "1",
    lyDo: "Lãnh đạo phòng hoàn thành tốt nhiệm vụ",
    tenDonVi: "Viện kiểm sát nhân dân tối cao",
    tenPhongBan: "Phòng Hình sự",
    maPhongBan: "000.09.59.T103",
    maDonVi: "000.00.59.T103",
    maNguoiDung: "6dc4d812-3d51-4323-b263-e6a92f83addb",
  },
  {
    hoVaTen: "Phạm Minh E",
    thuTuPB: 105,
    thuTuND: 6,
    taiKhoan: "079068035901",
    chucVu: "Chuyên viên",
    xepLoaiTuDG: "Loại B- Hoàn thành tốt nhiệm vụ",
    diemDanhGia: 85,
    xepLoaiDG: "Tốt",
    truongDonVi: "2",
    lyDo: "Thực hiện tốt nhiệm vụ",
    tenDonVi: "Văn phòng luật sư DEF",
    tenPhongBan: "Phòng Tư vấn pháp lý",
    maPhongBan: "000.09.59.T104",
    maDonVi: "000.00.59.T104",
    maNguoiDung: "6dc4d812-3d51-4323-b263-e6a92f83addc",
  },
  {
    hoVaTen: "Đỗ Văn F",
    thuTuPB: 106,
    thuTuND: 7,
    taiKhoan: "079068035902",
    chucVu: "Trợ lý",
    xepLoaiTuDG: "Loại C- Cần cải thiện",
    diemDanhGia: 65,
    xepLoaiDG: "Khá",
    truongDonVi: "3",
    lyDo: "Cần cải thiện kỹ năng làm việc nhóm",
    tenDonVi: "Tòa án nhân dân tối cao",
    tenPhongBan: "Phòng Hành chính",
    maPhongBan: "000.09.59.T105",
    maDonVi: "000.00.59.T105",
    maNguoiDung: "6dc4d812-3d51-4323-b263-e6a92f83addd",
  },
  {
    hoVaTen: "Bùi Thị G",
    thuTuPB: 107,
    thuTuND: 8,
    taiKhoan: "079068035903",
    chucVu: "Thẩm phán",
    xepLoaiTuDG: "Loại A- Xuất sắc",
    diemDanhGia: 92,
    xepLoaiDG: "Xuất sắc",
    truongDonVi: "0",
    lyDo: "Hoàn thành xuất sắc nhiệm vụ",
    tenDonVi: "Tòa án nhân dân thành phố Hà Nội",
    tenPhongBan: "Phòng Hình sự",
    maPhongBan: "000.09.59.T106",
    maDonVi: "000.00.59.T106",
    maNguoiDung: "6dc4d812-3d51-4323-b263-e6a92f83adde",
  },
  {
    hoVaTen: "Trần Văn H",
    thuTuPB: 108,
    thuTuND: 9,
    taiKhoan: "079068035904",
    chucVu: "Kiểm sát viên",
    xepLoaiTuDG: "Loại B- Hoàn thành tốt nhiệm vụ",
    diemDanhGia: 89,
    xepLoaiDG: "Tốt",
    truongDonVi: "1",
    lyDo: "Thực hiện tốt nhiệm vụ",
    tenDonVi: "Viện kiểm sát nhân dân tối cao",
    tenPhongBan: "Phòng Hình sự",
    maPhongBan: "000.09.59.T107",
    maDonVi: "000.00.59.T107",
    maNguoiDung: "6dc4d812-3d51-4323-b263-e6a92f83addf",
  },
  // Có thể tiếp tục thêm nhân viên nếu cần
];

interface IPhongTK {
  tenPhong: string;
  maPhong: string;
  users: IDanhMuc_ThongKeDanhGia_DuLieuPhieuCQ[];
}

interface IDepartmentTK {
  tenDonVi: string;
  maDonVi: string;
  phong: {
    [key: string]: IPhongTK;
  };
}
const groupByDepartments = (
  data: IDanhMuc_ThongKeDanhGia_DuLieuPhieuCQ[]
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

const WordBaoCao: React.FC = () => {
  const { dataDuLieuPhieuCQ: thongKeDatas } = useAppSelector(
    (state) => state.danhmuc_thongkedanhgias
  );
  const generateDocx = () => {
    if (!thongKeDatas) {
      console.error("Dữ liệu không có sẵn để xuất");
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
                    text: "Chức vụ",
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
                    text: "Tự nhận mức xếp loại",
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
                    text: "Kết quả đánh giá",
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
                    text: "Lý do thay đổi mức xếp loại(nếu có)",
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
                          text: user.hoVaTen,
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
                          text: user.chucVu,
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
                          text: user.xepLoaiTuDG,
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
                          text: user.diemDanhGia ? "Điểm đánh giá:  ": "",
                          size: 26,
                          color: "000000",
                          font: "Times New Roman",
                          bold: true, // In đậm
                        }),
                        new TextRun({
                          text:user.diemDanhGia ? user.diemDanhGia.toString() : "",
                          size: 26,
                          color: "000000",
                          font: "Times New Roman",
                        }),
                      ],                    
                      alignment: AlignmentType.CENTER,
                      spacing: { after: 240, before: 240 },
                    }),
                    new Paragraph(
                      {
                        children: [
                          new TextRun({
                            text: user.xepLoaiDG ? "Kết quả xếp loại: ": "",
                            size: 26,
                            color: "000000",
                            font: "Times New Roman",
                            bold: true, // In đậm
                          }),
                          new TextRun({
                            text: user.xepLoaiDG ? user.xepLoaiDG.toString() : "",
                            size: 26,
                            color: "000000",
                            font: "Times New Roman",
                          }),
                        ],                    
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 240, before: 240 },
                      })
                  ]
                }),
                new TableCell({
                  children: [new Paragraph(
                    {
                      children: [
                        new TextRun({
                          text: user.lyDo,
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
                  text: "THÔNG BÁO KẾT QUẢ ĐÁNH GIÁ, XẾP LOẠI ĐỐI VỚI CBCCVC, LAO ĐỘNG HỢP ĐỒNG",
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
                after: 300, // Khoảng cách dòng 1.5 (1.0 khoảng 120)
              },
              children: [
                new TextRun({
                  text: "Tháng: 10 /2024",
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
                          children: [
                            new TextRun({
                              text: "THỦ TRƯỞNG CƠ QUAN",
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
                              text: "(Ký tên, đóng dấu)",
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
      saveAs(blob, "Thông báo đánh giá cơ quan.docx");
    });
  };
  return (
    <>
      {thongKeDatas && thongKeDatas.length > 0 ? (
        <>
          {" "}
          <div
            style={{
              marginTop: 10,
              padding: "20px",
              fontFamily: "Times New Roman, serif",
            }}
            id="DanhSach"
          >
            <Row gutter={16} align="middle">
              <Col span={12} style={{ textAlign: "center" }}>
                <Title level={5} style={{ margin: 0 }}>
                  TÒA ÁN NHÂN DÂN TỐI CAO
                </Title>
              </Col>
              <Col span={12} style={{ textAlign: "center" }}>
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
            <Row style={{ textAlign: "center", marginTop: 10 }}>
              <Col span={24}>
                <Title level={4} style={{ margin: 0 }}>
                  THÔNG BÁO KẾT QUẢ ĐÁNH GIÁ, XẾP LOẠI ĐỐI VỚI CBCCVC, LAO ĐỘNG
                  HỢP ĐỒNG
                </Title>
                <Title level={5} style={{ margin: 0 }}>
                  <i>Tháng: 10 /2024</i>
                </Title>
              </Col>
            </Row>

            {/* Bảng dữ liệu 2 */}
            <table
              width="100%"
              cellPadding="0"
              cellSpacing="0"
              style={{ borderCollapse: "collapse", marginTop: 20 }}
            >
              <thead>
                <tr style={{ fontWeight: "bold", backgroundColor: "#f0f0f0" }}>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "5pt",
                      textAlign: "center",
                      borderRadius: "5px 0 0 0",
                    }}
                  >
                    STT
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "5pt",
                      textAlign: "center",
                    }}
                  >
                    Họ và tên
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "5pt",
                      textAlign: "center",
                    }}
                  >
                    Chức vụ
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "5pt",
                      textAlign: "center",
                    }}
                  >
                    Tự nhận mức xếp loại
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "5pt",
                      textAlign: "center",
                    }}
                  >
                    Kết quả đánh giá
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "5pt",
                      textAlign: "center",
                      borderRadius: "0 5px 0 0",
                    }}
                  >
                    Lý do thay đổi mức xếp loại(nếu có)
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
                            padding: "5pt",
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
                            padding: "5pt",
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
                                  padding: "5pt",
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
                                    padding: "5pt",
                                    border: "1px solid #ddd",
                                  }}
                                >
                                  {userIndex + 1}
                                </td>
                                <td
                                  style={{
                                    textAlign: "left",
                                    padding: "5pt",
                                    border: "1px solid #ddd",
                                  }}
                                >
                                  {user.hoVaTen}
                                </td>
                                <td
                                  style={{
                                    textAlign: "center",
                                    padding: "5pt",
                                    border: "1px solid #ddd",
                                  }}
                                >
                                  {user.chucVu}
                                </td>
                                <td
                                  style={{
                                    textAlign: "center",
                                    padding: "5pt",
                                    border: "1px solid #ddd",
                                  }}
                                >
                                  {user.xepLoaiTuDG}
                                </td>
                                <td
                                  style={{
                                    textAlign: "center",
                                    padding: "5pt",
                                    border: "1px solid #ddd",
                                  }}
                                >
                                  {user.diemDanhGia ? (
                                    <>
                                      <span>
                                        <b>Điểm đánh giá:</b>
                                        {user.diemDanhGia}
                                      </span>
                                      <br />
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  {user.xepLoaiDG ? (
                                    <>
                                      <b>Kết quả xếp loại:</b>
                                      {user.xepLoaiDG}
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </td>
                                <td
                                  style={{
                                    textAlign: "left",
                                    padding: "5pt",
                                    border: "1px solid #ddd",
                                  }}
                                >
                                  {user.lyDo}
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
            <Row style={{ marginTop: 20 }}>
              <Col span={12} style={{ textAlign: "left" }}>
                <Text></Text>
              </Col>
              <Col span={12} style={{ textAlign: "center" }}>
                <Text strong style={{ fontSize: 14 }}>
                  THỦ TRƯỞNG CƠ QUAN
                </Text>
                <Text italic style={{ fontSize: 12 }}>
                  {" "}
                  (Ký tên, đóng dấu)
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
