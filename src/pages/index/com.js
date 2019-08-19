/**
 * Created by miyaye on 2019/8/16.
 */
export default {
    formItems:{
        //input
        input:{
            type: 'input',
            parentId:null,
            props: {
                disabled:false,
                placeholder: '普通的input',
                size: 'small',
                clearable: true,
                icon: '',
            },
            attributes:{
                label:'',
                key:'',
            },
            events:{
                'on-click':()=>{alert('click')},
                'on-change':()=>{alert('change')},
                'on-blur':()=>{alert('blur')},
            }
        },
        //select
        select:{
            type: 'select',
            parentId:null,
            props: {
                placeholder: '普通的select',
                size: 'small',
                clearable: true,
                icon: '',
            },
            attributes:{
                label:'',
                key:'',
            },
            events:{
                'on-change':()=>{alert('change')},
            },
            options:[
                {
                    value: 'shenzhen',
                    disabled: true,
                    label: '深圳'
                },
                {
                    label: '韶关',
                    value: 'shaoguan'
                },
            ],
        },
        //date
        date:{
            type: 'date',
            parentId:null,
            attributes:{
                label:'',
                key:'',
            },
            props: {

            },
        },
    },
    grid:{
        type:'grid',
        parentId:null,
        slots:[],
        attributes:{
            column:0
        }
    }
}