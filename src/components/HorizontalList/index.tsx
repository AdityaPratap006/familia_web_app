import React from 'react';
import ReactElasticCarousel, { ReactElasticCarouselProps } from 'react-elastic-carousel';
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';
import { StyledArrow } from './styles';

interface HorizontalListProps extends ReactElasticCarouselProps {

}

const HorizontalList: React.FC<HorizontalListProps> = (props) => {
    return (
        <ReactElasticCarousel
            {...props}
            enableMouseSwipe={false}
            renderArrow={props => {
                let icon;
                if (props.type === 'NEXT') {
                    icon = (
                        <FiArrowRightCircle className='icon' />
                    );
                }

                if (props.type === 'PREV') {
                    icon = <FiArrowLeftCircle className='icon' />;
                }

                return (
                    <StyledArrow onClick={props.onClick} disabled={props.isEdge} >
                        {icon}
                    </StyledArrow>
                );
            }}
        >

        </ReactElasticCarousel>
    );
};

export default HorizontalList;
