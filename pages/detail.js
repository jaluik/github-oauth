const Detail = () => <div>detail</div>

Detail.getInitialProps = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res({})
        }, 2000)
    })
}

export default Detail
