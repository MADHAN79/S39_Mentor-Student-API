import CreateMentor from '../components/CreateMentor';
import CreateStudent from '../components/CreateStudent';
import AssignStudentsToMentor from '../components/AssignStudentsToMentor';
import ChangeMentor from '../components/ChangeMentor';
import MentorStudentsList from '../components/MentorStudentsList';
import StudentPreviousMentors from '../components/StudentPreviousMentors';

const Home = () => {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-center mb-8">Mentor-Student Management</h1>
            <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
                <CreateMentor />
                <CreateStudent />
                <AssignStudentsToMentor />
                <ChangeMentor />
                <MentorStudentsList />
                <StudentPreviousMentors />
            </div>
        </div>
    );
};

export default Home;
