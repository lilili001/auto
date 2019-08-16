/**
 * Created by miyaye on 2019/8/16.
 */
export default {
    formItem:{
        //input
        input:{
            type: 'input',
            label:'',
            key:'',
            props: {
                disabled:false,
                placeholder: '普通的input',
                size: 'small',
                clearable: true,
                icon: '',
            },
            slot:'this is slot',
            events:{
                'on-click':()=>{alert('click')},
                'on-change':()=>{alert('change')},
                'on-blur':()=>{alert('blur')},
            }
        },
        //select
        select:{
            type: 'select',
            label:'',
            key:'',
            props: {
                placeholder: '普通的select',
                size: 'small',
                clearable: true,
                icon: '',
            },
            slot:'this is slot',
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
            ]
        },
        //date
        date:{
            type: 'date',
            label:'',
            key:'',
            props: {
                type: 'date'
            }
        }
    }
}