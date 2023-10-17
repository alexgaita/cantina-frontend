import {Image, Typography} from "antd";
import {useState} from "react";
import {COLORS} from "../../../utils/constants.tsx";

interface IFilterCard {
    path: string
    name: string
    filtersClicked: string[],
    handleClick: (filter: string) => void
}

const FilterCard = ({path, name,filtersClicked,handleClick}: IFilterCard) => {

    const isClicked = filtersClicked.some((el)=>el === name)

    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={()=>handleClick(name)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '25px',
                width: 90,
                height: 110,
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                backgroundColor: isHovered || isClicked ? COLORS.TEXT_COLOR : "initial",
                cursor: isHovered ? "pointer" : 'initial'
            }}>
            <Image preview={false} src={path} width={50}/>
            <Typography style={{color: isHovered || isClicked ? "white" : COLORS.TEXT_COLOR}}>{name}</Typography>
        </div>
    );
};

export default FilterCard;