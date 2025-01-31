import React, { useEffect,useState } from "react";
import { findMemberAll } from '../../services/api';
import Member from "../../../../allowback/src/models/Member";
import { User } from "../../../../ts_ts/types";
const MemberList: React.FC = () => {
  const [Members, setMembers] = useState<User[]>([]);

  useEffect(()=>{
  const findMemberA = async () => {
    try {
        const findMemberList= await findMemberAll();
        // const findAllow = [];
        // for (let i = 0 ; i<findAllowancesByMemberId.Allowances.length;i++){
        //   findAllow.push(findAllowancesByMemberId.Allowances[i]);
        // }
        console.log("findMemberList = > ",findMemberList);
        const memberList = findMemberList.map((member:User) => {
            return member; // 각 allowance를 그대로 반환
          });
        
        setMembers(memberList); // allowances 상태 업데이트/
      } catch (error) {
        console.error("Error fetching allowances:", error);
      }

  };
  findMemberA();
},[]);
  return (
    <div className="memberList">
      <h3> 회원리스트</h3>
      <table>
        <thead>
          <tr>
            <th>no</th>
            {/* <th>joindate</th>/ */}
            <th>userEmail</th>
            <th>mobile</th>
            <th>nickname</th>
            <th>name</th>
            <th>birthday</th>
            <th>city</th>
            <th>yearAllowance</th>
          </tr>
        </thead>
        <tbody>
          {[...Members].reverse().map((member: User, index: number) => (
            <tr key={member.id}>
              <td>{index + 1}</td>
              {/* <td>{new Date(member.joinDate).toLocaleDateString('ko-KR')}</td> */}
              <td>{member.userEmail}</td>
              <td>{member.mobile}</td>
              <td>{member.nickname}</td>
              <td>{member.birthday}</td>
              <td>{member.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberList;
