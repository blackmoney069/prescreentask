import { Burger, Container, createStyles, Title } from "@mantine/core";

const useStyles=createStyles((theme)=>({
    headerClass: {
        display: "flex",
        justifyContent:"space-between",
        maxWidth:"100%"
    }
}));

export const Navbar = ()=>{
    const {classes} = useStyles();
    return(
    <Container className={classes.headerClass}>
        <Title>Get Supermind</Title>
        <Burger></Burger>  
    </Container>
    );
}