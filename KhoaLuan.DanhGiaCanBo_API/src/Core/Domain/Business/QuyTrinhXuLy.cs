using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace TD.DanhGiaCanBo.Domain.Business;
public class QuyTrinhXuLy : AuditableEntity, IAggregateRoot
{
    [MaxLength(255)]
    public string TenQuyTrinh { get; private set; }
    public int ThuTu { get; private set; } = 1;
    public bool LaQuyTrinhDonVi { get; private set; } = false;
    private readonly List<DonViSuDungQuyTrinhXuLy> _DonVis = [];
    public IReadOnlyCollection<DonViSuDungQuyTrinhXuLy> DonVis => _DonVis;
    private readonly List<BuocXuLy> _BuocXuLys = [];
    public IReadOnlyCollection<BuocXuLy> BuocXuLys => _BuocXuLys;
    private readonly List<LienKetBuocXuLy> _LienKetBuocXuLys = [];
    public IReadOnlyCollection<LienKetBuocXuLy> LienKetBuocXuLys => _LienKetBuocXuLys;
    public QuyTrinhXuLy() { }
    public QuyTrinhXuLy(string tenQuyTrinh, int thuTu, bool laQuyTrinhDonVi)
    {
        TenQuyTrinh = tenQuyTrinh;
        ThuTu = thuTu;
        LaQuyTrinhDonVi = laQuyTrinhDonVi;
    }
    public QuyTrinhXuLy Update(string? tenQuyTrinh, int? thuTu)
    {
        if (tenQuyTrinh != null)
            TenQuyTrinh = tenQuyTrinh;
        if (thuTu != null)
            ThuTu = (int)thuTu;
        return this;
    }

    public void AddLienKetBuocXuLy(List<LienKetBuocXuLy> lienKetBuocXuLys)
    {
        if(lienKetBuocXuLys == null || !lienKetBuocXuLys.Any())
        {
            return;
        }
        List<LienKetBuocXuLy>? edges = lienKetBuocXuLys?.Select(x => { x.SetQuyTrinhXuLyId(Id); return x; }).ToList();
        _LienKetBuocXuLys.AddRange(edges);
    }
    public void AddBuocXuLy(List<BuocXuLy> buocXuLys)
    {
        if (buocXuLys == null || !buocXuLys.Any())
        {
            return;
        }
        List<BuocXuLy>? nodes = buocXuLys?.Select(x => { x.SetQuyTrinhXuLyId(Id); return x; }).ToList();
        _BuocXuLys.AddRange(nodes);
    }

    public void AddDonViSuDungQuyTrinh(List<string> donViIds)
    {
        if(donViIds == null || !donViIds.Any())
        {
            return;
        }
        List<DonViSuDungQuyTrinhXuLy> donViSuDungQuyTrinhs = donViIds?.Select(x => new DonViSuDungQuyTrinhXuLy(x, Id)).ToList();
        _DonVis.AddRange(donViSuDungQuyTrinhs);
    }

    public void UpdateDonViSuDungQuyTrinh(List<string> donViIds, bool addIfNotExist = true)
    {
        if (donViIds == null || !donViIds.Any())
        {
            return;
        }
        var newDonViIds = donViIds.ConvertAll(id => new DonViSuDungQuyTrinhXuLy(id, Id));

        // Xóa các liên kết không còn nằm trong danh sách mới
        _DonVis.RemoveAll(existing => !donViIds.Contains(existing.OfficeCode));

        // Thêm các liên kết mới chưa có trong danh sách hiện tại
        foreach (var newDonVi in newDonViIds)
        {
            if (!_DonVis.Any(existing => existing.OfficeCode == newDonVi.OfficeCode))
            {
                _DonVis.Add(newDonVi);
            }
        }
    }
    public void UpdateLienKetBuocXuLys(List<LienKetBuocXuLy> updatedLienKetBuocXuLys, bool addIfNotExist = true, DefaultIdType? deletedBy = null)
    {
        var currentIdInDbs = _LienKetBuocXuLys.Select(x => x.Id).ToList();
        foreach (var updatedItem in updatedLienKetBuocXuLys)
        {
            var existingItem = _LienKetBuocXuLys.FirstOrDefault(x => x.Id == updatedItem.Id);
            if (existingItem != null)
            {
                currentIdInDbs.Remove(existingItem.Id);
                existingItem.Update(updatedItem);
            }
            else
            {
                if(addIfNotExist)
                {
                    updatedItem.SetQuyTrinhXuLyId(Id);
                    _LienKetBuocXuLys.Add(updatedItem);
                }
            }
        }
        if(currentIdInDbs.Count > 0)
        {
            foreach (var item in currentIdInDbs)
            {
                var removeLienKet = _LienKetBuocXuLys.FirstOrDefault(x => x.Id == item);
                if(removeLienKet != null)
                {
                    removeLienKet.SoftDelete(deletedBy);
                }
            }
        }
    }
    public void UpdateBuocXuLys(List<BuocXuLy> updatedBuocXuLys, bool addIfNotExist = true)
    {
        foreach (var updatedItem in updatedBuocXuLys)
        {
            var existingItem = _BuocXuLys.FirstOrDefault(x => x.Id == updatedItem.Id);

            if (existingItem != null)
            {
                existingItem.Update(updatedItem);
            }
            else
            {
                if (addIfNotExist)
                {
                    updatedItem.SetQuyTrinhXuLyId(Id);
                    _BuocXuLys.Add(updatedItem);
                }
            }
        }
    }

    public QuyTrinhXuLy SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public QuyTrinhXuLy Restore()
    {
        DeletedOn = null;
        return this;
    }
}
