import { fade } from "@material-ui/core/styles";

export const styles = theme => ({
    container: {
        width: "100%",
        paddingRight: "15px",
        paddingLeft: "15px",
        marginRight: "auto",
        marginLeft: "auto",
        [theme.breakpoints.down('xs')]: {
            width: 0,
        },
        [theme.breakpoints.down('sm')]: {
            width: 750,
        },
        [theme.breakpoints.up('md')]: {
            width: 970,
        },
        [theme.breakpoints.up('lg')]: {
            width: 1170,
        },
        [theme.breakpoints.up('xl')]: {
            width: 1450,
            padding: "0 64px"
        }
    },

    error: {
        backgroundColor: theme.palette.error.light,
        color: theme.palette.error.contrastText,
        padding: theme.spacing(2),
        marginBottom: theme.spacing(3),
    },

    //height
    h100: {
        height: "100% !important"
    },

    h100vh: {
        height: "100vh !important"
    },

    //width
    w10: {
        width: "10% !important"
    },

    w20: {
        width: "20% !important"
    },

    w30: {
        width: "30% !important"
    },

    w50: {
        width: "50% !important"
    },

    w60: {
        width: "60% !important"
    },

    w70: {
        width: "70% !important"
    },

    w90: {
        width: "90% !important"
    },

    w100: {
        width: "100% !important"
    },

    //padding
    p0: {
        padding: theme.spacing(0)
    },

    p1: {
        padding: theme.spacing(1)
    },

    p2: {
        padding: theme.spacing(2)
    },

    p3: {
        padding: theme.spacing(3)
    },

    p4: {
        padding: theme.spacing(4)
    },

    p5: {
        padding: theme.spacing(5)
    },

    //paddingHorizontal
    ph0: {
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0)
    },

    ph1: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },

    ph2: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },

    ph3: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3)
    },

    ph4: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4)
    },

    ph5: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5)
    },

    //paddingVertical
    pv0: {
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(0)
    },

    pv1: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },

    pv2: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },

    pv3: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    },

    pv4: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },

    pv5: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5)
    },

    //paddingTop
    pt0: {
        paddingTop: theme.spacing(0)
    },

    pt1: {
        paddingTop: theme.spacing(1)
    },

    pt2: {
        paddingTop: theme.spacing(2)
    },

    pt3: {
        paddingTop: theme.spacing(3)
    },

    pt4: {
        paddingTop: theme.spacing(4)
    },

    pt5: {
        paddingTop: theme.spacing(5)
    },

    //paddingLeft
    pl0: {
        paddingLeft: theme.spacing(0)
    },

    pl1: {
        paddingLeft: theme.spacing(1)
    },

    pl2: {
        paddingLeft: theme.spacing(2)
    },

    pl3: {
        paddingLeft: theme.spacing(3)
    },

    pl4: {
        paddingLeft: theme.spacing(4)
    },

    pl5: {
        paddingLeft: theme.spacing(5)
    },

    //paddingRight
    pr0: {
        paddingRight: theme.spacing(0)
    },

    pr1: {
        paddingRight: theme.spacing(1)
    },

    pr2: {
        paddingRight: theme.spacing(2)
    },

    pr3: {
        paddingRight: theme.spacing(3)
    },

    pr4: {
        paddingRight: theme.spacing(4)
    },

    pr5: {
        paddingRight: theme.spacing(5)
    },

    //paddingBottom
    pb0: {
        paddingBottom: theme.spacing(0)
    },

    pb1: {
        paddingBottom: theme.spacing(1)
    },

    pb2: {
        paddingBottom: theme.spacing(2)
    },

    pb3: {
        paddingBottom: theme.spacing(3)
    },

    pb4: {
        paddingBottom: theme.spacing(4)
    },

    pb5: {
        paddingBottom: theme.spacing(5)
    },

    //margin
    m0: {
        margin: theme.spacing(0) + "px !important"
    },

    m1: {
        margin: theme.spacing(1) + "px !important"
    },

    m2: {
        margin: theme.spacing(2) + "px !important"
    },

    m3: {
        margin: theme.spacing(3) + "px !important"
    },

    m4: {
        margin: theme.spacing(4) + "px !important"
    },

    m5: {
        margin: theme.spacing(5) + "px !important"
    },

    //marginHorizontal
    mh0: {
        marginLeft: theme.spacing(0),
        marginRight: theme.spacing(0)
    },

    mh1: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },

    mh2: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    },

    mh3: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3)
    },

    mh4: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4)
    },

    mh5: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5)
    },

    //Margin Vertical
    mv0: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(0)
    },

    mv1: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)

    },

    mv2: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },

    mv3: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },

    mv4: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    },

    mv5: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5)
    },


    //Margin Top
    mt0: {
        marginTop: theme.spacing(0)
    },

    mt1: {
        marginTop: theme.spacing(1)
    },

    mt2: {
        marginTop: theme.spacing(2)
    },


    mt3: {
        marginTop: theme.spacing(3)
    },

    mt4: {
        marginTop: theme.spacing(4)
    },

    mt5: {
        marginTop: theme.spacing(5)
    },

    //marginLeft
    ml0: {
        marginLeft: theme.spacing(0)
    },

    ml1: {
        marginLeft: theme.spacing(1)
    },

    ml2: {
        marginLeft: theme.spacing(2)
    },


    ml3: {
        marginLeft: theme.spacing(3)
    },


    ml4: {
        marginLeft: theme.spacing(4)
    },


    ml5: {
        marginLeft: theme.spacing(5)
    },

    //marginRight
    mr0: {
        marginRight: theme.spacing(0)
    },

    mr1: {
        marginRight: theme.spacing(1)
    },

    mr2: {
        marginRight: theme.spacing(2)
    },

    mr3: {
        marginRight: theme.spacing(3)
    },

    mr4: {
        marginRight: theme.spacing(4)
    },

    mr5: {
        marginRight: theme.spacing(5)
    },

    //Margin Bottom
    mb0: {
        marginBottom: theme.spacing(0)
    },

    mb1: {
        marginBottom: theme.spacing(1)
    },

    mb2: {
        marginBottom: theme.spacing(2)
    },


    mb3: {
        marginBottom: theme.spacing(3)
    },


    mb4: {
        marginBottom: theme.spacing(4)
    },


    mb5: {
        marginBottom: theme.spacing(5)
    },


    //Navbar
    nav: {
        backgroundColor: theme.palette.primary.main,
        '& nav': {
            display: 'flex',
            alignItems: "center",
            justifyContent: 'space-between',
        },
        '& nav ul': {
            listStyle: 'none',
            textAlign: 'center',
            margin: 0
        },
        '& nav ul li': {
            display: 'inline-block'
        },
        '& nav ul li a': {
            display: 'block',
            padding: '15px',
            textDecoration: 'none',
            fontWeight: 500,
            textTransform: 'uppercase',
        },

    },


    navItem: {
        fontSize: '1rem',
        fontWeight: 400,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        '&:hover': {
            color: theme.palette.common.white,
        },
        display: 'inline-block',
        padding: '10px',
        position: 'relative',
    },



    toolbar: {
        display: "flex",
        position: "relative",
        alignItems: "center",
        justifyContent: 'space-between',
        margin: 0,
        padding: 0,
        [theme.breakpoints.down('xs')]: {
            minHeight: 48,
        },
        [theme.breakpoints.down('sm')]: {
            minHeight: 48,
        },
        [theme.breakpoints.up('md')]: {
            minHeight: 64,
        },
        [theme.breakpoints.up('lg')]: {
            minHeight: 64,
        },
        [theme.breakpoints.up('xl')]: {
            minHeight: 64,
        }
    },

    itemAppBar: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: 'center'
    },

    navItems: {
        paddingLeft: theme.spacing(3)
    },

    navItem: {
        textDecoration: 'none'
    },

    navButton: {
        color: theme.palette.primary.contrastText,
    },

    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputInput: {
        color: theme.palette.primary.contrastText,
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },

    link: {
        color: theme.palette.text.primary,
        textDecoration: "none",
        backgroundColor: "transparent",
    },


    //Footer
    footer: {
        display: "flex",
        position: "relative",
        alignItems: "center",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        [theme.breakpoints.down('xs')]: {
            minHeight: 48,
        },
        [theme.breakpoints.down('sm')]: {
            minHeight: 48,
        },
        [theme.breakpoints.up('md')]: {
            minHeight: 64,
        },
        [theme.breakpoints.up('lg')]: {
            minHeight: 64,
        },
        [theme.breakpoints.up('xl')]: {
            minHeight: 64,
        }
    },

    //Paper
    paperRoot: {
        color: theme.palette.text.primary,
        padding: theme.spacing(3)
    },

    paperRounded: {
        borderRadius: 4
    },

    paperOutlined: {
        border: '1px solid ' + theme.palette.border.main
    },

    //Switch
    switch: {
        height: 0,
        width: 0,
        visibility: 'hidden',
        '& :checked':{
            left: 'calc(100% - 2px)',
            transform: 'translateX(-100%)',
        },
        '& :active':{
            width: '60px'
        }
    },
    
    switchLabel: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        width: '100px',
        height: '50px',
        background: 'grey',
        borderRadius: '100px',
        position: 'relative',
        transition: 'background-color .2s',
        '& :checked':{
            left: 'calc(100% - 2px)',
            transform: 'translateX(-100%)',
        },
        '& :active':{
            width: '60px'
        }
    },

    switchButton: {
        content: '""',
        position: 'absolute',
        top: '2px',
        left: '2px',
        width: '45px',
        height: '45px',
        borderRadius: '45px',
        transition: '0.2s',
        background: '#fff',
        boxShadow: '0 0 2px 0 rgba(10, 10, 10, 0.29)',
        '& :checked':{
            left: 'calc(100% - 2px)',
            transform: 'translateX(-100%)',
        },
        '& :active':{
            width: '60px'
        }
      },

    //LoginPage RigisterPage
    form: {
        width: "75%", // Fix IE 11 issue.
        marginTop: 15
    },
    submit: {
        marginTop: '10px !important',
        marginBottom: '10px !important'
    },

    img:{
        objectFit: 'cover',
        height: '100%',
        width: '100%'
    },

    title: {
        display: "grid",
        justifyContent: "center",
        textAlign: "center",
        paddingBottom: 20
    },

    avatar: {
        width: 32,
        height: 32,
    },

    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },

    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    },

    icons: {
        width: 30,
        height: 30,
        marginLeft: 5,
        marginRight: 5,
    },

    loginIcon: {
        margin: theme.spacing(1),
        marginBottom: theme.spacing(3),
        textAlign: "center",
        backgroundColor: theme.palette.primary.main
    },


})
