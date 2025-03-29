interface User {
  name: string;
  email: string;
  role: string;
  unitNumber?: string;
}

interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  date: string;
  category: 'plumbing' | 'electrical' | 'structural' | 'appliance' | 'other';
}

class Store {
  private static instance: Store;
  private users: User[] = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'resident',
      unitNumber: '101'
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'manager',
      unitNumber: '102'
    },
    {
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'resident',
      unitNumber: '103'
    },
    {
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      role: 'resident',
      unitNumber: '104'
    }
  ];
  private requests: MaintenanceRequest[] = [
    {
      id: '1',
      title: 'Leaking Faucet',
      description: 'Kitchen sink faucet is leaking and needs repair',
      status: 'pending',
      priority: 'high',
      date: '2024-02-15',
      category: 'plumbing'
    },
    {
      id: '2',
      title: 'Broken Light',
      description: 'Living room light not working properly',
      status: 'in_progress',
      priority: 'medium',
      date: '2024-02-14',
      category: 'electrical'
    },
    {
      id: '3',
      title: 'Cracked Window',
      description: 'Bedroom window has a crack and needs replacement',
      status: 'completed',
      priority: 'low',
      date: '2024-02-13',
      category: 'structural'
    },
    {
      id: '4',
      title: 'Faulty Air Conditioner',
      description: 'Air conditioner is not cooling properly',
      status: 'pending',
      priority: 'high',
      date: '2024-02-16',
      category: 'appliance'
    },
    {
      id: '5',
      title: 'Noisy Neighbor',
      description: 'Excessive noise from upstairs unit',
      status: 'in_progress',
      priority: 'medium',
      date: '2024-02-15',
      category: 'other'
    }
  ];

  private constructor() {}

  static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }

  // User management
  addUser(user: User) {
    this.users.push(user);
  }

  getUsers(): User[] {
    return this.users;
  }

  // Maintenance request management
  addRequest(request: MaintenanceRequest) {
    this.requests.push(request);
  }

  getRequests(): MaintenanceRequest[] {
    return this.requests;
  }
}

export const store = Store.getInstance(); 