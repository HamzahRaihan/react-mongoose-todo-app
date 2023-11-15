import { useContext, useMemo, useState } from 'react';
import { TodosContext } from '../context/TodosContext';
import { filterTodos } from '../utils/utils';
import Todos from './Todos';
import CloudinaryUploadWidget from './CloudinaryUploadWidget';

function TodoList() {
  const [input, setInput] = useState('');
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState('');
  const [todoId, setTodoId] = useState('');
  const [tab, setTab] = useState('all');
  const { todos, handleSubmit, handleEdit, handleDelete, loading } = useContext(TodosContext);

  const [fileUrl, setFileUrl] = useState('');

  const [setPublicId] = useState('');
  // Replace with your own cloud name
  const [cloudName] = useState('hzxyensd5');
  // Replace with your own upload preset
  const [uploadPreset] = useState('aoh4fpwm');

  // Upload Widget Configuration
  // Remove the comments from the code below to add
  // additional functionality.
  // Note that these are only a few examples, to see
  // the full list of possible parameters that you
  // can add see:
  //   https://cloudinary.com/documentation/upload_widget_reference

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    // cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    // multiple: false,  //restrict upload to a single file
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  });

  const handleAddTodo = (e) => {
    e.preventDefault();
    handleSubmit(input, fileUrl);
    console.log('🚀 ~ file: TodoList.jsx:16 ~ TodoList ~ fileUrl:', fileUrl);
  };

  const handleEditModal = (id) => {
    setModal(true);
    setTodoId(id);
  };

  const handleEditButton = (todoId, edit, complete) => {
    console.log('🚀 ~ file: TodoList.jsx:23 ~ handleEditButton ~ complete:', complete);
    handleEdit(todoId, edit, complete);
    setModal(false);
    setEdit('');
  };

  const buttons = [
    { name: 'All', value: 'all' },
    { name: 'Active', value: 'active' },
    { name: 'Complete', value: 'complete' },
  ];

  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);

  return (
    <div className="p-7">
      <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} setFileUrl={setFileUrl} />
      <form className="flex gap-2" onSubmit={handleAddTodo}>
        <input className="border border-black" type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button className="border border-black px-2">add</button>
      </form>
      <div className="flex gap-2">
        {buttons.map((btn) => (
          <button className={`${tab == btn.value ? 'font-bold' : ''}`} key={btn.value} value={btn.value} onClick={() => setTab(btn.value)}>
            {btn.name}
          </button>
        ))}
      </div>
      {loading && <div>Loading</div>}
      {!loading && visibleTodos?.length === 0 && <div>tidak ada data</div>}
      {!loading && visibleTodos?.length > 0 && visibleTodos.map((item) => <Todos key={item._id} todos={item} handleEditButton={handleEditButton} handleEditModal={handleEditModal} handleDelete={handleDelete} />)}
      {modal && (
        <div className="black border border-black p-2">
          <input className="border border-black" type="text" value={edit} onChange={(e) => setEdit(e.target.value)} />
          <button onClick={() => handleEditButton(todoId, edit)}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default TodoList;
