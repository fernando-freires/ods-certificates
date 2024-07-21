// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Certificates {
    
    struct CertificateData {
        string courseName;
        uint256 courseId;
        bytes32 certificateHash;
        uint256 completionDate;
    }

    mapping(address => CertificateData[]) private certificates;

    // Evento para registro de novo certificado
    event CertificateAdded(address indexed student, string courseName, uint256 courseId, bytes32 certificateHash, uint256 completionDate);

    // Função para adicionar um certificado
    function addCertificate(address student, string memory courseName, uint256 courseId, uint256 completionDate) public {
        bytes32 certificateHash = keccak256(abi.encodePacked(student, courseName, courseId, completionDate, block.timestamp));
        CertificateData memory newCertificate = CertificateData({
            courseName: courseName,
            courseId: courseId,
            certificateHash: certificateHash,
            completionDate: completionDate
        });
        certificates[student].push(newCertificate);

        emit CertificateAdded(student, courseName, courseId, certificateHash, completionDate);
    }

    // Função para obter a lista de certificados de um endereço
    function getCertificates(address student) public view returns (CertificateData[] memory) {
        return certificates[student];
    }

    // Função para obter um certificado específico de um endereço baseado no ID (índice da lista)
    function getCertificateById(address student, uint256 id) public view returns (CertificateData memory) {
        require(id < certificates[student].length, "Invalid certificate ID");
        return certificates[student][id];
    }

    // Função para contar o número de certificados de um endereço
    function getCertificateCount(address student) public view returns (uint256) {
        return certificates[student].length;
    }

    // Função para verificar a validade de um certificado por hash
    function verifyCertificate(address student, uint256 id, bytes32 certificateHash) public view returns (bool) {
        require(id < certificates[student].length, "Invalid certificate ID");
        return certificates[student][id].certificateHash == certificateHash;
    }
}
