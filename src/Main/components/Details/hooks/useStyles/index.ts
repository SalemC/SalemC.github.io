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
        opacity: 0,
        color: '#ffffff',
        textShadow: '1px 1px 1px rgba(0, 0, 0, 0.1)',
        transition: 'opacity 0.4s ease-in-out',
    },

    profession: {
        fontSize: 14,
        opacity: 0,
        color: '#ffffff',
        fontStyle: 'italic',
        letterSpacing: '3px',
        textShadow: '1px 1px 1px rgba(0, 0, 0, 0.1)',
        transition: 'opacity 0.4s ease-in-out',
        transitionDelay: '0.5s',
    },

    description: {
        fontSize: 14,
        opacity: 0,
        color: '#ffffff',
        marginTop: 10,
        letterSpacing: '0.5px',
        textShadow: '1px 1px 1px rgba(0, 0, 0, 0.1)',
        transition: 'opacity 0.4s ease-in-out',
        transitionDelay: '1s',
    },

    primaryTextVisible: {
        opacity: 0.9,
    },

    secondaryTextVisible: {
        opacity: 0.8,
    },
});
