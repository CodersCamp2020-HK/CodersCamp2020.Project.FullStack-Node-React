import React, { useContext, useState, useEffect } from 'react';
import GalleryPage from '../galleryPage/GalleryPage';
import { BrowserRouter as Router, Link, useLocation, useRouteMatch, useHistory, Route } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { GetAnimalsQueryParams, useGetAnimals } from '../../client/index';
import LoadingCircle from '../loadingCircle/LoadingCircle';
import { makeStyles } from '@material-ui/core/styles';

type GalleryType = 1 | 2 | 3;

interface Props {
    galleryType: GalleryType;
    query: GetAnimalsQueryParams;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const useStyle = makeStyles({
    gallery: {
        marginTop: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pagination: {
        margin: '60px 0',
    },
});

const Gallery: React.FC<Props> = ({ query, currentPage, setCurrentPage, galleryType }) => {
    const { path } = useRouteMatch();
    const location = useLocation();
    const history = useHistory();
    // console.log(path);
    // console.log(location);
    // console.log(history);
    const classes = useStyle();
    const { data, loading } = useGetAnimals({ queryParams: { ...query, count: true } });
    const [pages, setPages] = useState(1);

    interface MyData {
        count: number;
    }

    useEffect(() => {
        if (data !== null) {
            setPages(Math.ceil(((data as unknown) as MyData).count / 6));
        }
    }, [data]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return loading ? (
        <LoadingCircle size={70} />
    ) : (
        <div className={classes.gallery}>
            <GalleryPage query={query} currentPage={currentPage} galleryType={galleryType} />
            <Route>
                {({ location }) => {
                    const query = new URLSearchParams(location.search);
                    const page = parseInt(query.get('page') || '1');
                    return (
                        <Pagination
                            className={classes.pagination}
                            color="primary"
                            page={currentPage}
                            count={pages}
                            defaultPage={1}
                            renderItem={(item) => (
                                <PaginationItem
                                    component={Link}
                                    to={`${path}${item.page === 1 ? `` : `?page=${item.page}`}`}
                                    {...item}
                                />
                            )}
                            onChange={handleChange}
                        />
                    );
                }}
            </Route>
        </div>
    );
};

export default Gallery;
