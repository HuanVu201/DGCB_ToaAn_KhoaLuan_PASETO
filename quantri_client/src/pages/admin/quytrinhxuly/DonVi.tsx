import { lazy } from '@/utils/lazyLoading';

const QuyTrinhXuLyTableWrapper = lazy(() => import('../../../features/quytrinhxuly/components/QuyTrinhXuLyTable'))

const DonVi = () => {
    return <QuyTrinhXuLyTableWrapper extraSearchParams={{laQuyTrinhDonVi: true}}/>
}

export default DonVi