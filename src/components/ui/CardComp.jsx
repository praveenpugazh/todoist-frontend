import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Todo from './Todo'

// eslint-disable-next-line react/prop-types
export function CardComp({ todos, setTodos }) {
  // eslint-disable-next-line react/prop-types
  // eslint-disable-next-line react/prop-types
  const reverserTodos = todos.toReversed()
  return (
    <Card className='w-[380px] md:w-[450px]'>
      <CardHeader>
        <CardTitle>Your Todo</CardTitle>
        <CardDescription>Please find your todo&apos;s below</CardDescription>
      </CardHeader>
      <CardContent>
        {/* eslint-disable-next-line react/prop-types */}
        {reverserTodos.map((todo) => (
          <Todo key={todo._id} todo={todo} todos={todos} setTodos={setTodos} />
        ))}
      </CardContent>
    </Card>
  )
}

