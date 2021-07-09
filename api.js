const MockApi = {
    getMe: () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    data: [
                        "abc/abc/a",
                        "abc/abc/b",
                        "abc/abc/c",
                        "abc/abc/d",
                    ]
                })
            }, 500)
        })
    }
}

export default MockApi