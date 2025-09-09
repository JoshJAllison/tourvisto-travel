import { users } from "~/constants";
import { Header } from "../../../components";
import { ColumnsDirective, ColumnDirective, GridComponent } from "@syncfusion/ej2-react-grids";

const AllUsers = () => {
  return (
    <main className="all-users wrapper">
      <Header 
        title="Manage Users"
        description="Filter, sort and access detailed user profiles"
      />


      <GridComponent dataSource={users} gridLines="None">
        <ColumnsDirective>
          <ColumnDirective
            field="name"
            headerText="Name"
            width="200"
            textAlign="Left"
            template={(props: UserData) => (
              <div className="flex items-center gap-1.5 px-4">
                <img src={props.imageUrl} alt="user" className="rounded-full size-8 aspect-square" />
                  <span>{props.name}</span>
              </div>
            )}
          />
        </ColumnsDirective>
      </GridComponent>
    </main>
  );
};

export default AllUsers;
