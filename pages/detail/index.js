import withRepoBasic from '../../components/WithRepoBasic'

const Detail = ({ text }) => {
    return <span>Detail {text}</span>
}

Detail.getInitialProps = async () => {
    console.log('执行了。。。。')
    return {
        text: 456,
    }
}

export default withRepoBasic(Detail, 'index')
