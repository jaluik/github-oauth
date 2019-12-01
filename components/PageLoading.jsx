import { Spin } from 'antd'
export default () => (
    <div className="root">
        <Spin />
        <style jsx>
            {`
                .root {
                    position: fixed;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.3);
                    z-index: 1001;
                }
            `}
        </style>
    </div>
)
