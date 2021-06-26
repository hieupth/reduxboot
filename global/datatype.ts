type user = {
    name: string,
    avatar: string | undefined | null,
    email: string,
}

type notification = {
    [id: string]: {
        title: string,
        read: boolean,
    }
}

type document = [{
    isFile: boolean,
    name: string,
    owner: string,
    process: number,
    score: number,
    updated: string,
}]

export type {
    user,
    notification,
    document,
}