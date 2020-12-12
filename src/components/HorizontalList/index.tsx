import React from 'react';
import ReactElasticCarousel, { ReactElasticCarouselProps } from 'react-elastic-carousel';
import { StyledArrow } from './styles';

interface HorizontalListProps extends ReactElasticCarouselProps {

}

const HorizontalList: React.FC<HorizontalListProps> = (props) => {
    return (
        <ReactElasticCarousel
            {...props}
            renderArrow={props => {
                return <StyledArrow onClick={props.onClick} disabled={props.isEdge} />;
            }}
        >

        </ReactElasticCarousel>
    );
};

export default HorizontalList;
