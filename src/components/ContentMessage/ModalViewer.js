import React from 'react';
import clsx from 'clsx';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { payloads } from '../../store';
import { useAppMessageHook } from '../../customHooks';
import styles from './ModalViewer.module.css';

function ModalViewer({ files, urlCurrent }) {
    const { state, dispatch } = useAppMessageHook();
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        loop: true,
    };
    const handleCloseButton = (e) => {
        e.stopPropagation();
        dispatch(
            payloads.setToogleModalViewer({
                ...state.toogleViewer,
                status: false,
            })
        );
    };
    const handleContentClick = (e) => {
        e.stopPropagation();
        dispatch(
            payloads.setToogleModalViewer({
                ...state.toogleViewer,
                status: true,
            })
        );
    };
    const data = [...new Set([urlCurrent, ...files])];
    return (
        <div
            className={`${clsx(styles.modal_viewer_container)}`}
            onClick={handleCloseButton}
        >
            <div
                className={`${clsx(styles.modal_close)}`}
                onClick={handleCloseButton}
            >
                <i className='fa-solid fa-xmark'></i>
            </div>
            <div
                className={`${clsx(styles.modal_viewer_content)}`}
                onClick={handleContentClick}
            >
                <Slider {...settings}>
                    {data.map((url, index) => (
                        <div
                            className={`${clsx(styles.modal_viewer_item)}`}
                            key={index}
                        >
                            <img src={url} alt='image_viewer' />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default ModalViewer;
