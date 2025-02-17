import { lazy } from '@/utils/lazyLoading';

const QuyTrinhXuLyTableWrapper = lazy(() => import('../../../features/quytrinhxuly/components/QuyTrinhXuLyTable'))

const CaNhan = () => {
    return <QuyTrinhXuLyTableWrapper extraSearchParams={{laQuyTrinhDonVi: false}}/>
}

export default CaNhan