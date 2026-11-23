import { motion, AnimatePresence } from 'motion/react'
import { Plus, Trash2, Edit, UserPlus, Briefcase, TrendingUp, ChevronRight, Star } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Card } from '@components/ui'
import { Button } from '@components/ui/Button'
import { Badge } from '@components/ui/Badge'
import { NumberDisplay } from '@components/ui/NumberDisplay'
import { Avatar } from '@components/ui/Avatar'
import { formatCurrency } from '@utils/helpers'
import { useGameStore } from '@store/gameStore'

const roleLabels: Record<string, string> = {
  junior: 'Junior',
  senior: 'Senior',
  lead: 'Lead',
  manager: 'Manager',
  director: 'Director',
}

const roleColors: Record<string, string> = {
  junior: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  senior: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  lead: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  manager: 'bg-champagne-400/20 text-champagne-400 border-champagne-400/30',
  director: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
}

const departmentLabels: Record<string, string> = {
  product: 'Product Development',
  marketing: 'Marketing',
  finance: 'Finance',
  operations: 'Operations',
  support: 'Customer Support',
}

const departmentColors: Record<string, string> = {
  product: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  marketing: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  finance: 'bg-green-500/20 text-green-400 border-green-500/30',
  operations: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  support: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
}

export function EmployeeList() {
  const { employees, departments, actions } = useGameStore()
  const [editingEmployee, setEditingEmployee] = React.useState<string | null>(null)
  const [showForm, setShowForm] = React.useState(false)
  const [deletingEmployee, setDeletingEmployee] = React.useState<string | null>(null)

  const handleDelete = (id: string) => {
    setDeletingEmployee(id)
  }

  const confirmDelete = (id: string) => {
    actions.fireEmployee(id)
    setDeletingEmployee(null)
  }

  const getSatisfactionColor = (satisfaction: number) => {
    if (satisfaction >= 80) return 'success'
    if (satisfaction >= 60) return 'warning'
    return 'danger'
  }

  if (employees.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <UserPlus className="w-16 h-16 text-slate-600 mb-4" />
        <h3 className="text-heading-lg font-display font-semibold text-ivory-100 mb-2">No Employees Yet</h3>
        <p className="text-body text-slate-400 mb-6 max-w-md">
          Hire your first employee to grow your team. Employees work in departments and boost your company's capabilities.
        </p>
        <Button onClick={() => setShowForm(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Hire First Employee
        </Button>
      </div>
    )
  }

  // Group employees by department
  const employeesByDept = employees.reduce((acc, emp) => {
    if (!acc[emp.department]) acc[emp.department] = []
    acc[emp.department].push(emp)
    return acc
  }, {} as Record<string, typeof employees>)

  const deptOrder: (keyof typeof departmentLabels)[] = ['product', 'marketing', 'finance', 'operations', 'support']

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-heading-lg font-display font-semibold text-ivory-100">Team Members</h2>
          <p className="text-body-sm text-slate-400">{employees.length} employee{employees.length !== 1 ? 's' : ''} across {Object.keys(employeesByDept).length} department{Object.keys(employeesByDept).length !== 1 ? 's' : ''}</p>
        </div>
        <Button onClick={() => setShowForm(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Hire Employee
        </Button>
      </div>

      {deptOrder.map(deptType => {
        const deptEmployees = employeesByDept[deptType]
        const dept = departments.find(d => d.type === deptType)

        if (!deptEmployees || deptEmployees.length === 0) return null

        return (
          <motion.section
            key={deptType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-heading-md font-display font-semibold text-ivory-100 flex items-center gap-2">
                <Badge variant="default" className={departmentColors[deptType]}>
                  {departmentLabels[deptType]}
                </Badge>
                {dept && (
                  <>
                    <span className="text-body-sm text-slate-400">Level {dept.level}</span>
                    <Badge variant="champagne" className="text-caption">
                      {deptEmployees.length} member{deptEmployees.length !== 1 ? 's' : ''}
                    </Badge>
                  </>
                )}
              </h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {deptEmployees.map((employee, index) => (
                <motion.article
                  key={employee.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="card-hover relative"
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar avatarId={employee.name.toLowerCase().replace(' ', '-')} size="lg" />
                        <div>
                          <h4 className="font-medium text-ivory-100">{employee.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="default" className={roleColors[employee.role]}>
                              {roleLabels[employee.role]}
                            </Badge>
                            <span className="text-caption text-slate-400">Lvl {employee.level}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" onClick={() => setEditingEmployee(employee.id)} aria-label="Edit employee">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(employee.id)} aria-label="Fire employee">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="bg-graphite-800/50 rounded-lg p-3 text-center">
                        <p className="text-caption text-slate-400">Productivity</p>
                        <NumberDisplay value={Math.round(employee.productivity * 100)} format="percentage" size="md" color={employee.productivity >= 1.2 ? 'success' : employee.productivity >= 1 ? 'champagne' : 'warning'} className="block" />
                      </div>
                      <div className="bg-graphite-800/50 rounded-lg p-3 text-center">
                        <p className="text-caption text-slate-400">Satisfaction</p>
                        <NumberDisplay value={employee.satisfaction} format="percentage" size="md" color={getSatisfactionColor(employee.satisfaction)} className="block" />
                      </div>
                      <div className="bg-graphite-800/50 rounded-lg p-3 text-center">
                        <p className="text-caption text-slate-400">Salary (Monthly)</p>
                        <NumberDisplay value={employee.currentSalary} format="currency" size="sm" color="default" className="block" />
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="pt-3 border-t border-graphite-800">
                      <p className="text-caption text-slate-400 mb-2">Skills</p>
                      <div className="flex flex-wrap gap-1.5">
                        {employee.skills.slice(0, 4).map((skill, i) => (
                          <span key={i} className="px-2 py-1 bg-graphite-800 rounded text-caption text-slate-300 border border-graphite-700">
                            {skill.name} {skill.level}/{skill.maxLevel}
                          </span>
                        ))}
                        {employee.skills.length > 4 && (
                          <span className="px-2 py-1 bg-graphite-800 rounded text-caption text-slate-500 border border-graphite-700">
                            +{employee.skills.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )
      })}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deletingEmployee && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-graphite-950/80 backdrop-blur-sm"
            onClick={() => setDeletingEmployee(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-graphite-900 rounded-xl border border-graphite-800 p-6 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-heading-lg font-display font-semibold text-ivory-100 mb-2">Fire Employee?</h3>
              <p className="text-body text-slate-400 mb-6">
                Are you sure you want to fire this employee? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setDeletingEmployee(null)}>Cancel</Button>
                <Button variant="danger" onClick={() => confirmDelete(deletingEmployee!)}>Fire</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}