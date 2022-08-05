import { createUseStyles } from 'react-jss';

export default createUseStyles({
    container: {
        position: 'absolute',
        top: 50,
        left: 50,
        borderRadius: 8,
        maxWidth: 400,
    },

    name: {
        fontSize: 36,
        fontWeight: 'bold',
        opacity: 0.9,
        color: '#ffffff',
    },

    profession: {
        fontSize: 14,
        opacity: 0.8,
        color: '#ffffff',
        fontStyle: 'italic',
        letterSpacing: '3px',
    },

    description: {
        fontSize: 14,
        opacity: 0.8,
        color: '#ffffff',
        marginTop: 10,
        letterSpacing: '0.5px',
    },
});
