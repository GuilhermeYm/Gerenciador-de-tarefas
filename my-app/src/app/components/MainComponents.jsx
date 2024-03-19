import { CiCircleCheck, CiEdit } from "react-icons/ci";
import { MdCancel } from "react-icons/md";

const MainComponents = () => {
  const taskExample = [""];
  return (
    <main className="px-4 min-w-full flex flex-col items-center">
      <h1 className="text-lg font-semibold">Tarefas</h1>
      <div>
        <table className="table-fixed border border-slate-500 border-collapse h-auto w-50%">
          <thead>
            <tr className="bg-gray-200">
              <th className="border-slate-600 border px-4 py-2">ID</th>
              <th className="border-slate-600 border px-4 py-2">Título</th>
              <th className="border-slate-600 border px-4 py-2">
                Conteúdo da Tarefa
              </th>
              <th className="border-slate-600 border px-4 py-2">Feito?</th>
              <th className="border-slate-600 border px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {taskExample.map((task) => (
              <tr className="hover:bg-gray-100">
                <td className="border border-slate-600 px-4 py-2">{task.id}</td>
                <td className="border border-slate-600 px-4 py-2">
                  {task.title}
                </td>
                <td className="border border-slate-600 px-4 py-2">
                  {task.content}
                </td>
                <td className="border border-slate-600 px-4 py-2">
                  {task.done}
                </td>
                <td className="border border-slate-600">
                  <div className="flex flex-row justify-between">
                    <button className="text-2xl hover:text-green-600 transition-colors">
                      <i>
                        <CiCircleCheck />
                      </i>
                    </button>
                    <button className="text-2xl hover:text-red-600 transition-colors">
                      <i>
                        <MdCancel />
                      </i>
                    </button>
                    <button className="text-2xl hover:text-blue-600 transition-colors">
                      <i>
                        <CiEdit />
                      </i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 flex flex-row italic text-zinc-400">
        Se você clicar na tarefa, você irá conseguir ver o conteúdo inteiro!
      </p>
    </main>
  );
};

export default MainComponents;
