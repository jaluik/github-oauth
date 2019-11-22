import Link from 'next/link'
import { Button } from 'antd'
export default ({ children }) => (
    <>
        <Link href="/a?id=1" as="/a/1">
            <Button>A</Button>
        </Link>
        <Link href="/b">
            <Button>B</Button>
        </Link>
        <div>{children}</div>
    </>
)
