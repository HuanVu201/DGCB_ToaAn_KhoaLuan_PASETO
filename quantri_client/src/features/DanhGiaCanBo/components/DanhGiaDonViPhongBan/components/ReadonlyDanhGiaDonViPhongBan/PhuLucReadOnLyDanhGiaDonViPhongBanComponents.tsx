import { FormInstance, Table } from "antd";
// import { formDemo1, formDemo2 } from "./formDemo1";
import { useState, useEffect, useMemo } from "react";
import { ExpandOutlined, MinusCircleOutlined, MinusSquareOutlined, PlusCircleOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import Item from "antd/es/list/Item";
import { IDanhGiaColumn, ITieuChiCouple } from "@/features/DanhGiaCanBo/components/common/models/phieuDanhGia";
import { useReadonlyDanhGiaDonViPhongBanContext } from "../../contexts/useReadonlyDanhGiaDonViPhongBanContext";
import { useMauPhieuReadonlyDanhGiaDonViPhongBanColumn } from "../../hooks/useMauPhieuReadonlyDanhGiaDonViPhongBanColumn";


function PhuLucReadOnLyDanhGiaDonViPhongBanComponents({ dataRoot, scorePoint }: {
    dataRoot: IDanhGiaColumn,
    scorePoint: string,
}) {
    const danhGiaContext = useReadonlyDanhGiaDonViPhongBanContext()
    const [dataSource, setDataSource] = useState<IDanhGiaColumn[]>([]);
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

    useEffect(() => {
        if (dataRoot.DanhSachTieuChiCon) {
            setDataSource(dataRoot.DanhSachTieuChiCon as any)
        }
    }, [])

    useEffect(() => {
        if (dataSource && dataSource.length)
            dataSource.forEach(ele => {
                const trElement: any = document.querySelector(`tr[data-row-key="${ele.MaTieuChi}"]`);

                if (trElement) {
                    trElement.style.backgroundColor = 'lightblue';

                    const tdElements = trElement.querySelectorAll('td');
                    if (tdElements.length > 1) {
                        const firstTd = tdElements[0];
                        const secondTd = tdElements[1];

                        firstTd.style.fontWeight = 800;
                        secondTd.style.fontWeight = 800;

                    }
                }
            })
    }, [dataSource])

    useEffect(() => {
        (async () => {
            if (dataSource) {
                const jsonOpposeArr: { currCode: string, json: string }[] = []
                const jsonDiemLietArr: { currCode: string, json: string }[] = []
                traverseNodes(dataSource)

                function traverseNodes(nodes: IDanhGiaColumn[]) {
                    nodes.forEach((node) => {
                        if (node.JsonLienKet)
                            jsonOpposeArr.push({
                                currCode: node.MaTieuChi || '',
                                json: node.JsonLienKet
                            })
                        if (node.JsonDiemLiet)
                            jsonDiemLietArr.push({
                                currCode: node.MaTieuChi || '',
                                json: node.JsonDiemLiet
                            })

                        if (node.DanhSachTieuChiCon && node.DanhSachTieuChiCon.length > 0) {
                            traverseNodes(node.DanhSachTieuChiCon);
                        }
                    })
                }

                if (jsonOpposeArr && jsonOpposeArr.length > 0) {
                    let combo: ITieuChiCouple[] = []


                    jsonOpposeArr.forEach(item => {
                        let combosDiemLiet = JSON.parse(item.json);

                        for (let i = 0; i < combosDiemLiet.length; i++) {

                            if (combosDiemLiet[i].Ma)
                                combo.push({
                                    tieuChi1: combosDiemLiet[i].Ma, // Đảo ngược index để dễ xử lý onChange
                                    tieuChi2: item.currCode,
                                })

                        }
                    })


                    if (combo && combo.length > 0) {
                        const comboExpand: ITieuChiCouple[] = []
                        combo.forEach(item => {
                            traverseNodesGetAllChildToAdd(dataSource, item.tieuChi1, item.tieuChi2)
                            traverseNodesGetAllChildToAdd(dataSource, item.tieuChi2, item.tieuChi1)
                        })
                        function traverseNodesGetAllChildToAdd(nodes: IDanhGiaColumn[], maTieuChi1: string, maTieuChi2: string) {
                            nodes.forEach((node) => {
                                if (maTieuChi2 == node.MaTieuChi) {
                                    if (node.DanhSachTieuChiCon && node.DanhSachTieuChiCon.length > 0) {
                                        node.DanhSachTieuChiCon.forEach(child => {
                                            comboExpand.push({
                                                tieuChi1: maTieuChi1,
                                                tieuChi2: child.MaTieuChi || ''
                                            })
                                        })
                                    }
                                }
                                if (node.DanhSachTieuChiCon && node.DanhSachTieuChiCon.length > 0) {
                                    traverseNodesGetAllChildToAdd(node.DanhSachTieuChiCon, maTieuChi1, maTieuChi2);
                                }
                            })
                        }
                        combo = [...combo, ...comboExpand]
                    }

                    combo = removeDuplicates(combo)
                    if (combo && combo.length > 0) {
                        danhGiaContext.setOpposeArr(combo)
                    }
                }

                if (jsonDiemLietArr && jsonDiemLietArr.length > 0) {
                    let combo: ITieuChiCouple[] = []
                    jsonDiemLietArr.forEach(item => {
                        let combosDiemLiet = JSON.parse(item.json);

                        for (let i = 0; i < combosDiemLiet.length; i++) {

                            if (combosDiemLiet[i].Ma)
                                combo.push({
                                    tieuChi1: combosDiemLiet[i].Ma, // Đảo ngược index để dễ xử lý onChange
                                    tieuChi2: item.currCode,
                                    soLanTieuChi1: combosDiemLiet[i].SoLan || 0,
                                })

                        }
                    })

                    if (combo && combo.length > 0) {
                        const comboExpand: ITieuChiCouple[] = []
                        combo.forEach(item => {
                            traverseNodesGetAllChildToAdd(dataSource, item.tieuChi1, item.tieuChi2, item.soLanTieuChi1 || 0)
                            traverseNodesGetAllChildToAdd(dataSource, item.tieuChi2, item.tieuChi1, item.soLanTieuChi1 || 0)
                        })
                        function traverseNodesGetAllChildToAdd(nodes: IDanhGiaColumn[], maTieuChi1: string, maTieuChi2: string, soLan: number) {
                            nodes.forEach((node) => {
                                if (maTieuChi2 == node.MaTieuChi) {
                                    if (node.DanhSachTieuChiCon && node.DanhSachTieuChiCon.length > 0) {
                                        node.DanhSachTieuChiCon.forEach(child => {
                                            comboExpand.push({
                                                tieuChi1: maTieuChi1,
                                                tieuChi2: child.MaTieuChi || '',
                                                soLanTieuChi1: soLan
                                            })
                                        })
                                    }
                                }
                                if (node.DanhSachTieuChiCon && node.DanhSachTieuChiCon.length > 0) {
                                    traverseNodesGetAllChildToAdd(node.DanhSachTieuChiCon, maTieuChi1, maTieuChi2, soLan);
                                }
                            })
                        }
                        combo = [...combo, ...comboExpand]
                    }

                    combo = removeDuplicates(combo)
                    if (combo && combo.length > 0) {
                        danhGiaContext.setDiemLietArr(combo)
                    }
                }


            }
        })()
    }, [dataSource])

    const removeDuplicates = (arr: ITieuChiCouple[]): ITieuChiCouple[] => {
        const seen = new Set<string>();
        return arr.filter(item => {

            const key1 = `${item.tieuChi1}-${item.tieuChi2}`;
            const key2 = `${item.tieuChi2}-${item.tieuChi1}`;

            if (seen.has(key1) || seen.has(key2) || item.tieuChi1 === item.tieuChi2) {
                return false;
            }
            seen.add(key1);
            return true;
        });
    };

    useEffect(() => {
        if (dataSource) {
            const rowsWithChildren = getAllExpandedRowKeys(dataSource);
            setExpandedRowKeys(rowsWithChildren); // Mở rộng các hàng có hàng con
        }
    }, [dataSource]);

    const getAllExpandedRowKeys = (data: IDanhGiaColumn[]): string[] => {
        let expandedKeys: string[] = [];
        data.forEach((item) => {
            if (item.DanhSachTieuChiCon && item.DanhSachTieuChiCon.length > 0) {
                expandedKeys.push(item.MaTieuChi!); // Thêm hàng hiện tại vào danh sách mở
                expandedKeys = expandedKeys.concat(getAllExpandedRowKeys(item.DanhSachTieuChiCon)); // Đệ quy cho các hàng con
            }
        });

        return expandedKeys;
    };

    const onExpand = (expanded: boolean, record: IDanhGiaColumn) => {
        setExpandedRowKeys((keys) =>
            expanded
                ? [...keys, record.MaTieuChi!] // Thêm hàng khi mở rộng
                : keys.filter((key) => key !== record.MaTieuChi) // Loại bỏ hàng khi thu gọn
        );
    };



    const filteredDataSource = useMemo(() => {
        const filterData = (items: IDanhGiaColumn[]): IDanhGiaColumn[] => {
            return items.filter(item => {
                if (!danhGiaContext.kiemNhiem && item.KiemNhiem) {
                    return false;
                }
                if (item.DanhSachTieuChiCon && item.DanhSachTieuChiCon.length > 0) {
                    item.DanhSachTieuChiCon = filterData(item.DanhSachTieuChiCon);
                }
                return true;
            });
        };
        return filterData(dataSource);
    }, [dataSource, danhGiaContext.kiemNhiem]);


    const columns = useMauPhieuReadonlyDanhGiaDonViPhongBanColumn({
        scorePoint,
        dataSource,
        expandedRowKeys,
        onExpand,
    });

    return (
        <div className="tieuChiComponent">
            <Table
                columns={columns}
                dataSource={filteredDataSource}
                rowKey="MaTieuChi"
                bordered
                expandable={{
                    expandedRowKeys,
                    onExpand,
                    childrenColumnName: "DanhSachTieuChiCon",
                    expandIconColumnIndex: 1,
                    expandIcon: ({ expanded, onExpand, record }) =>
                        record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0 ? (
                            <span onClick={(e) => onExpand(record, e)}>
                                {expanded ? <><MinusCircleOutlined /> {' '}</> : <><PlusCircleOutlined /> {' '} </>}
                            </span>
                        ) : null,
                }}
                pagination={false}
            />


        </div>



    );
}

export default PhuLucReadOnLyDanhGiaDonViPhongBanComponents;
