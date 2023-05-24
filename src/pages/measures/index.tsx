import DashboardLayout from "@/component/Layout";
import {  useRouter } from "next/router";
import { useGetAllMeasure } from "@/features/measure/measure.service";
import { Button, List, Table } from 'antd';

export default function MeasurelistPage(){
    const router = useRouter();
   // const { data: measurementlist, isLoading  } = useGetAllMeasurement();
   const { data: measurelist } = useGetAllMeasure();
    
return(
    <DashboardLayout>
      
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div className="flex mt-2">
    <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Les unités de mesure disponibles</h3>
     </div>
{/*<List
  itemLayout="horizontal"
  dataSource={measurelist?.data.data}
  renderItem={(unit, description) => (
    <List.Item>
      <List.Item.Meta
        title= {unit}
        description={description}/>
    </List.Item>
  )}
  />*/}

<Table dataSource={measurelist?.data.data}>
    <Table.Column title='Unité' dataIndex={"unit"} key={"id"} />
    <Table.Column title='Description' dataIndex={"description"} key={"id"} />
    {/*<Table.Column title='Action'  
                    render={(value, record: any) =>{
                        return <>
                               <Button type="link" href={"/stores/edit/" + record.id } >Modifier</Button>  
                               <Button type="link" onClick={ () => onDelete(value)}>Supprimer</Button> 
                        </>
                       
                    }}
                    dataIndex={"id"}
                    key={"id"} />*/}
    </Table>


</div>
</DashboardLayout>

);


}