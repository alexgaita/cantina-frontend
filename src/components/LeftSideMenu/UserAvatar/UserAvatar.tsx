import {Avatar, Typography} from "antd";

interface IAvatar {
    name: string
    image: string
}

const UserAvatar = ({name, image}: IAvatar) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2}}>
            <div style={{padding: 10, backgroundColor: 'white', borderRadius: '15px'}}>

                <Avatar shape="square" size={100}
                        src={image}/>
            </div>
            <Typography.Paragraph strong style={{
                color: '#3c4151',
                fontSize: "20px",
                textAlign: 'center'
            }}>{name}</Typography.Paragraph>
        </div>
    );
};
export default UserAvatar;