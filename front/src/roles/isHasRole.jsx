export const isHasRole = (roles) => {

    if (roles.includes('admin')) {
        console.log('admin') 
    }else if(roles.includes('staff')){
        console.log('staff') 
    }else{
        console.log('student') 
    }
}