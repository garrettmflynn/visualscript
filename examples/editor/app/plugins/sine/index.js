const sine = (time, frequency=1, amplitude=1, phase=0, center=0) => {

    console.error(time, frequency, amplitude, phase, center)
    return amplitude * Math.sin((2 * frequency * Math.PI) * (time + phase)) + center
}

export default {
    tag: 'sine',
    operator: sine,
}
