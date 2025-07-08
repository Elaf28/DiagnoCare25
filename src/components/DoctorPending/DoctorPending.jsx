import React from 'react';
import { Card, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function DoctorPending() {
    return (
        <div className="d-flex justify-content-center align-items-center text-center bg-light" style={{ minHeight: '80vh', padding: '40px' }}>
            <Card className="p-4 shadow rounded-4" style={{ maxWidth: '600px', width: '100%' }}>
                <Card.Body>
                    <h2 className="mb-4" style={{ color: 'var(--first-color)' }}>
                        Welcome to DiagnoCare!
                    </h2>
                    <Alert variant="info" className="mb-4 text-start">
                        <h5 className="alert-heading">Your Account is Awaiting Approval</h5>
                        <p>
                            Thank you for registering with us. Your account is currently under review by the admin team.
                        </p>
                        <p className="mb-0">
                            While your account is pending approval, you can still access your profile and update your information.
                            Once approved, your profile will be publicly visible to patients.
                        </p>
                    </Alert>
                    <p className="mb-4 text-muted">
                        You can monitor your approval status directly from your profile page. If you have any questions, feel free to <a href="mailto:diagnocaree@gmail.com">contact us</a>.
                    </p>
                    <Button
                        style={{ background: 'var(--first-color)', border: 'none' }}
                        as={Link}
                        to="/doctorProfile"
                    >
                        Go to Your Profile
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
}
