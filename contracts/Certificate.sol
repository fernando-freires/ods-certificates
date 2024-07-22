// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Certificates {
    struct CertificateData {
        address userAddress;
        string courseName;
        string courseId;
        bytes32 certificateHash;
        uint256 completionDate;
    }

    mapping(address => CertificateData[]) private certificates;
    mapping(bytes32 => CertificateData) private certificateByHash;

    // Evento para registro de novo certificado
    event CertificateAdded(
        address indexed userAddress,
        string courseName,
        string courseId,
        bytes32 certificateHash,
        uint256 completionDate
    );

    // Função para adicionar um certificado
    function addCertificate(
        address userAddress,
        string memory courseName,
        string memory courseId,
        uint256 completionDate
    ) public {
        bytes32 certificateHash = keccak256(
            abi.encodePacked(userAddress, courseName, courseId, completionDate, block.timestamp)
        );
        CertificateData memory newCertificate = CertificateData({
            userAddress: userAddress,
            courseName: courseName,
            courseId: courseId,
            certificateHash: certificateHash,
            completionDate: completionDate
        });

        certificates[userAddress].push(newCertificate);
        certificateByHash[certificateHash] = newCertificate;

        emit CertificateAdded(userAddress, courseName, courseId, certificateHash, completionDate);
    }

    // Função para obter a lista de certificados de um endereço
    function getCertificates(address userAddress) public view returns (CertificateData[] memory) {
        return certificates[userAddress];
    }

    // Função para obter um certificado específico de um endereço baseado no courseId
    function getCertificateByCourseId(
        address userAddress,
        string memory courseId
    ) public view returns (CertificateData memory) {
        CertificateData[] memory userAddressCertificates = certificates[userAddress];
        for (uint256 i = 0; i < userAddressCertificates.length; i++) {
            if (
                keccak256(abi.encodePacked(userAddressCertificates[i].courseId)) ==
                keccak256(abi.encodePacked(courseId))
            ) {
                return userAddressCertificates[i];
            }
        }
        revert("Certificate not found for the given courseId");
    }

    // Função para contar o número de certificados de um endereço
    function getCertificateCount(address userAddress) public view returns (uint256) {
        return certificates[userAddress].length;
    }

    // Função para verificar a validade de um certificado por hash e retornar o endereço do usuário detentor do certificado
    function verifyCertificate(bytes32 certificateHash) public view returns (address) {
        CertificateData memory cert = certificateByHash[certificateHash];
        require(cert.userAddress != address(0), "Certificate not found for the given hash");
        return cert.userAddress;
    }
}
