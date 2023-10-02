const useRandom = ({min = 0, max = 10})=>{
    const shuffle = ({min:mn, max:mx})=>{
        return Math.ceil(Math.random() * ((mx?mx:max) - (mn?mn:min)) + (mn?mn:min));
    }
    return {shuffle}
}

export default useRandom